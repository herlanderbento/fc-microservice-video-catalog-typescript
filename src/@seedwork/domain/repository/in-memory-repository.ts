import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found.error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import {
  RepositoryInterface,
  SearchableRepositoryInterface,
} from "./repository-contracts";

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = [];

  public async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  public async findById(id: string | UniqueEntityId): Promise<E> {
    const _id: string = `${id}`;

    return this.get(_id);
  }

  public async findAll(): Promise<E[]> {
    return this.items;
  }

  public async update(entity: E): Promise<void> {
    await this.get(entity.id);

    const indexFound: number = this.items.findIndex(
      (item: E): boolean => item.id === entity.id
    );

    this.items[indexFound] = entity;
  }

  public async delete(id: string | UniqueEntityId): Promise<void> {
    const _id: string = `${id}`;

    await this.get(_id);

    const indexFound: number = this.items.findIndex(
      (item: E): boolean => item.id === _id
    );

    this.items.splice(indexFound, 1);
  }

  protected async get(id: string): Promise<E> {
    const item: E = this.items.find((item: E): boolean => item.id === id);

    if (!item) {
      throw new NotFoundError(`Entity Not Found using ID ${id}`);
    }

    return item;
  }
}

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  public async search(searchParams: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
