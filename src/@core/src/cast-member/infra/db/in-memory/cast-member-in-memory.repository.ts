import CastMemberRepository from "../../../domain/repository/cast-member.repository";
import { InMemorySearchableRepository } from "../../../../@seedwork/domain/repository/in-memory-repository";
import { CastMember, CastMemberId } from "../../../domain/entities/cast-member";
import { SortDirection } from "../../../../@seedwork/domain";

export class CastMemberInMemoryRepository
  extends InMemorySearchableRepository<
    CastMember,
    CastMemberId,
    CastMemberRepository.Filter
  >
  implements CastMemberRepository.Repository
{
  sortableFields: string[] = ["name", "created_at"];

  protected async applyFilter(
    items: CastMember[],
    filter: CastMemberRepository.Filter
  ): Promise<CastMember[]> {
    if (!filter) {
      return items;
    }

    return items.filter((item) => {
      const containsName =
        filter.name &&
        item.props.name.toLowerCase().includes(filter.name.toLowerCase());
      const hasType = filter.type && item.props.type.equals(filter.type);
      return filter.name && filter.type
        ? containsName && hasType
        : filter.name
        ? containsName
        : hasType;
    });
  }

  protected async applySort(
    items: CastMember[],
    sort: string,
    sort_dir: SortDirection
  ): Promise<CastMember[]> {
    return !sort
      ? super.applySort(items, "created_at", "desc")
      : super.applySort(items, sort, sort_dir);
  }
}
