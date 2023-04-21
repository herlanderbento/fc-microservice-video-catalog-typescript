import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found.error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import {
  RepositoryInterface,
  SearchParams,
  SearchResult,
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
  implements SearchableRepositoryInterface<E>
{
  sortableFields: string[] = [];

  public async search(props: SearchParams): Promise<SearchResult<E>> {
    const itemsFiltered: Array<E> = await this.applyFilter(
      this.items,
      props.filter
    );
    const itemsSorted: Array<E> = await this.applySort(
      itemsFiltered,
      props.sort,
      props.sort_dir
    );
    const itemsPaginated: Array<E> = await this.applyPaginate(
      itemsSorted,
      props.page,
      props.per_page
    );

    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      current_page: props.page,
      per_page: props.per_page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    });
  }

  protected abstract applyFilter(
    items: Array<E>,
    filter: string | null
  ): Promise<Array<E>>;

  protected async applySort(
    items: Array<E>,
    sort: string | null,
    sort_dir: string | null
  ): Promise<Array<E>> {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items;
    }

    return [...items].sort((a: E, b: E) => {
      if (a.props[sort] < b.props[sort]) {
        return sort_dir === "asc" ? -1 : 1;
      }

      if (a.props[sort] > b.props[sort]) {
        return sort_dir === "asc" ? 1 : -1;
      }

      return 0;
    });
  }

  protected async applyPaginate(
    items: E[],
    page: SearchParams["page"],
    per_page: SearchParams["per_page"]
  ): Promise<E[]> {
    const start: number = (page - 1) * per_page;
    const limit: number = start + per_page;

    return items.slice(start, limit);
  }
}
