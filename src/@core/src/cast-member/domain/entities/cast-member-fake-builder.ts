import { CastMemberType } from "../value-object/cast-member-type.vo";
import { Chance } from "chance";
import { CastMember, CastMemberId } from "./cast-member";

type PropOrFactory<T> = T | ((index: number) => T);

export class CastMemberFakeBuilder<TBuild = any> {
  private _entity_id = undefined;
  private _name: PropOrFactory<string> = (_index) => this.chance.word();
  private _type: PropOrFactory<CastMemberType> = (_index) =>
    CastMemberType.createAnActor();
  private _created_at = undefined;
  private countObjs: number;

  get entity_id(): CastMemberId {
    return this.getValue("entity_id");
  }

  get name(): string {
    return this.getValue("name");
  }

  get type(): CastMemberType {
    return this.getValue("type");
  }

  get created_at(): Date {
    return this.getValue("created_at");
  }

  public static aDirector() {
    return new CastMemberFakeBuilder<CastMember>().withType(
      CastMemberType.createADirector()
    );
  }

  public static anActor() {
    return new CastMemberFakeBuilder<CastMember>().withType(
      CastMemberType.createAnActor()
    );
  }

  public static theActors(countObjs: number) {
    return new CastMemberFakeBuilder<CastMember[]>(countObjs).withType(
      CastMemberType.createAnActor()
    );
  }

  public static theDirectors(countObjs: number) {
    return new CastMemberFakeBuilder<CastMember[]>(countObjs).withType(
      CastMemberType.createADirector()
    );
  }

  public static theCastMembers(countObjs: number) {
    return new CastMemberFakeBuilder<CastMember[]>(countObjs);
  }

  private chance: Chance.Chance;

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  public withEntityId(valueOrFactory: PropOrFactory<CastMemberId>) {
    this._entity_id = valueOrFactory;
    return this;
  }

  public withName(valueOrFactory: PropOrFactory<string>) {
    this._name = valueOrFactory;
    return this;
  }

  public withType(valueOrFactory: PropOrFactory<CastMemberType>) {
    this._type = valueOrFactory;
    return this;
  }

  public withInvalidNameEmpty(value: "" | null | undefined) {
    this._name = value;
    return this;
  }

  public withInvalidNameNotAString(value?: any) {
    this._name = value ?? 5;
    return this;
  }

  public withInvalidNameTooLong(value?: string) {
    this._name = value ?? this.chance.word({ length: 256 });
    return this;
  }

  public withInvalidType() {
    this._type = "fake type" as any;
    return this;
  }

  public withCreatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._created_at = valueOrFactory;
    return this;
  }

  public build(): TBuild {
    const categories = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new CastMember(
          {
            name: this.callFactory(this._name, index),
            type: this.callFactory(this._type, index),
            ...(this._created_at && {
              created_at: this.callFactory(this._created_at, index),
            }),
          },
          !this._entity_id
            ? undefined
            : this.callFactory(this._entity_id, index)
        )
    );
    return this.countObjs === 1 ? (categories[0] as any) : categories;
  }

  private getValue(prop) {
    const optional = ["entity_id", "created_at"];
    const privateProp = `_${prop}`;
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(
        `Property ${prop} not have a factory, use 'with' methods`
      );
    }
    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === "function"
      ? factoryOrValue(index)
      : factoryOrValue;
  }
}
