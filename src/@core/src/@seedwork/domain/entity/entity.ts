import UniqueEntityId from "../value-objects/unique-entity-id.vo";

export abstract class Entity<Props = any> {
  public readonly uniqueEntityId: UniqueEntityId;

  public constructor(public readonly props: Props, id?: UniqueEntityId) {
    this.uniqueEntityId = id || new UniqueEntityId();
  }

  public get id(): string {
    return this.uniqueEntityId.value;
  }

  public toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}

export default Entity;
