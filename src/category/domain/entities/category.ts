import Entity from "../../../@seedwork/entity/entity";
import UniqueEntityId from "../../../@seedwork/domain/value-object/unique-entity-id.vo";

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export class Category extends Entity<CategoryProperties> {
  public constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    super(props, id);
    this.description = this.props.description;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  public get name(): string {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  public get description(): string {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  public get is_active(): boolean {
    return this.props.is_active;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public update(name: string, description: string): void {
    this.name = name;
    this.description = description;
  }

  public activate(): void {
    this.props.is_active = true;
  }

  public deactivate(): void {
    this.props.is_active = false;
  }
}
