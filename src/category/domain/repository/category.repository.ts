import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from "../../../@seedwork/domain/repository/repository-contracts";
import { Category } from "../entities/category";

namespace CategoryRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}
  export class SearchResult extends DefaultSearchResult<Category, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Category,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default CategoryRepository;

// export type CategoryFilter = string;

// export class CategorySearchParams extends SearchParams<CategoryFilter> {}

// export class CategorySearchResult extends SearchResult<
//   Category,
//   CategoryFilter
// > {}

// export default interface CategoryRepository
//   extends SearchableRepositoryInterface<
//     Category,
//     CategoryFilter,
//     CategorySearchParams,
//     CategorySearchResult
//   > {}
