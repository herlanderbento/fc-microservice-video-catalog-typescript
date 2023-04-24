import Entity from "#seedwork/domain/entity/entity";
import { EntityValidationError } from "#seedwork/domain/errors/validation-error";
import UniqueEntityId from "#seedwork/domain/value-objects/unique-entity-id.vo";
import CategoryValidatorFactory, {
  CategoryValidator,
} from "../validators/category.validator";

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export type CategoryPropsJson = Required<{ id: string } & CategoryProperties>;

export class Category extends Entity<CategoryProperties> {
  public constructor(
    public readonly props: CategoryProperties,
    id?: UniqueEntityId
  ) {
    super(props, id);
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

  // public static validate(props: Omit<CategoryProperties, "create_at">): void {
  //   ValidatorRules.values(props.name, "name")
  //     .required()
  //     .string()
  //     .maxLength(255);
  //   ValidatorRules.values(props.description, "description").string();
  //   ValidatorRules.values(props.is_active, "is_active").boolean();
  // }

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
}
