import { Category, CategoryId } from "./category";
import { Chance } from "chance";

type PropOrFactory<T> = T | ((index: number) => T);

export class CategoryFakeBuilder<TBuild = any> {
  private _entity_id = undefined;
  private _name: PropOrFactory<string> = (_index) => this.chance.word();
  private _description: PropOrFactory<string | null> = (_index) =>
    this.chance.paragraph();
  private _is_active: PropOrFactory<boolean> = (_index) => true;
  private _created_at = undefined;
  private countObjs: number;
  private chance: Chance.Chance;

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  public static aCategory(): CategoryFakeBuilder<Category> {
    return new CategoryFakeBuilder<Category>();
  }

  public static theCategories(countObjs: number) {
    return new CategoryFakeBuilder<Category[]>(countObjs);
  }

  public withEntityId(valueOrFactory: PropOrFactory<CategoryId>): this {
    this._entity_id = valueOrFactory;
    return this;
  }

  public withName(valueOrFactory: PropOrFactory<string>): this {
    this._name = valueOrFactory;
    return this;
  }

  public withInvalidNameEmpty(value: "" | null | undefined): this {
    this._name = value;
    return this;
  }

  public withInvalidNameNotAString(value?: any): this {
    this._name = value ?? 5;
    return this;
  }

  public withInvalidNameTooLong(value?: string): this {
    this._name = value ?? this.chance.word({ length: 256 });
    return this;
  }

  public withDescription(valueOrFactory: PropOrFactory<string | null>): this {
    this._description = valueOrFactory;
    return this;
  }

  public withInvalidDescriptionNotAString(value?: any): this {
    this._description = value ?? 5;
    return this;
  }

  public withInvalidIsActiveEmpty(value: "" | null | undefined): this {
    this._is_active = value as any;
    return this;
  }

  public withInvalidIsActiveNotABoolean(value?: any): this {
    this._is_active = value ?? "fake boolean";
    return this;
  }

  public withCreatedAt(valueOrFactory: PropOrFactory<Date>): this {
    this._created_at = valueOrFactory;
    return this;
  }

  public build(): TBuild { 
    const categories = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new Category(
          {
            name: this.callFactory(this._name, index),
            description: this.callFactory(this._description, index),
            is_active: this.callFactory(this._is_active, index),
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

  public get entity_id() {
    return this.getValue("entity_id");
  }

  public get name() {
    return this.getValue("name");
  }

  public get description() {
    return this.getValue("description");
  }

  public get is_active() {
    return this.getValue("is_active");
  }

  public get created_at() {
    return this.getValue("created_at");
  }

  public activate() {
    this._is_active = true;
    return this;
  }

  public deactivate() {
    this._is_active = false;
    return this;
  }
  
  private getValue(prop: string) {
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
