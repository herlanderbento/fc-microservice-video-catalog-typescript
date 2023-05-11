import AggregateRoot from "../../../@seedwork/domain/entity/aggregate-root";
import { EntityValidationError } from "../../../@seedwork/domain/errors/validation-error";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import CategoryValidatorFactory, {
  CategoryValidator,
} from "../validators/category.validator";
import { CategoryFakeBuilder } from "./category-fake-builder";

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export type CategoryPropsJson = Required<{ id: string } & CategoryProperties>;

export class CategoryId extends UniqueEntityId {}

export class Category extends AggregateRoot<
  CategoryId,
  CategoryProperties,
  CategoryPropsJson
> {
  public constructor(
    public readonly props: CategoryProperties,
    entityId?: CategoryId
  ) {
    super(props, entityId ?? new CategoryId());
    Category.validate(props);
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
    Category.validate({
      name,
      description,
    });
    this.name = name;
    this.description = description;
  }

  public static validate(props: CategoryProperties): void {
    const validator: CategoryValidator = CategoryValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public activate(): void {
    this.props.is_active = true;
  }

  public deactivate(): void {
    this.props.is_active = false;
  }

  public static fake() {
    return CategoryFakeBuilder;
  }

  public toJSON(): CategoryPropsJson {
    return {
      id: this.id.toString(),
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
    };
  }
}
