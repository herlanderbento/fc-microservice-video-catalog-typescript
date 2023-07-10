import { CastMemberType, Types } from "../value-object/cast-member-type.vo";
import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchProps,
  SearchResult as DefaultSearchResult,
} from "../../../@seedwork/domain/repository/repository-contracts";
import { CastMember, CastMemberId } from "../entities/cast-member";
import { SearchValidationError } from "../../../@seedwork/domain/errors/validation-error";

export namespace CastMemberRepository {
  export type Filter = {
    name?: string;
    type?: CastMemberType;
  };

  export class SearchParams extends DefaultSearchParams<Filter> {
    public get filter(): Filter | null {
      return this._filter;
    }

    private constructor(props: SearchProps<Filter> = {}) {
      super(props);
    }

    public static create(
      props: Omit<SearchProps<Filter>, "filter"> & {
        filter?: {
          name?: string;
          type?: Types;
        };
      } = {}
    ) {
      const [type, errorCastMemberType] = props.filter?.type
        ? CastMemberType.create(props.filter.type)
        : [null, null];

      if (errorCastMemberType) {
        const error = new SearchValidationError();
        error.setFromError("type", errorCastMemberType);
        throw error;
      }

      return new SearchParams({
        ...props,
        filter: {
          name: props.filter?.name || null,
          type: type,
        },
      });
    }

    protected set filter(value: Filter | null) {
      const _value =
        !value || (value as unknown) === "" || typeof value !== "object"
          ? null
          : value;

      const filter = {
        ...(_value.name && { name: `${_value?.name}` }),
        ...(_value.type && { type: _value.type }),
      };

      this._filter = Object.keys(filter).length === 0 ? null : filter;
    }
  }

  export class SearchResult extends DefaultSearchResult<CastMember, Filter> {
    public toJSON(forceEntity = false) {
      const props = super.toJSON(forceEntity);
      return {
        ...props,
        filter: props.filter
          ? {
              ...(props.filter.name && { name: props.filter.name }),
              ...(props.filter.type && { type: props.filter.type.value }),
            }
          : null,
      };
    }
  }

  export interface Repository
    extends SearchableRepositoryInterface<
      CastMember,
      CastMemberId,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default CastMemberRepository;
