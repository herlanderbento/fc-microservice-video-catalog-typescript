import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from "../../../@seedwork/domain/repository/repository-contracts";
import { Category, CategoryId } from "../entities";

export namespace CategoryRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<Category, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Category,
      CategoryId,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default CategoryRepository;
