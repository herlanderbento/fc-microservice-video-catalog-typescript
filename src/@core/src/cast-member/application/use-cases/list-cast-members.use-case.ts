import { default as DefaultUseCase } from "../../../@seedwork/application/use-cases";
import { CastMemberOutput, CastMemberOutputMapper } from "../dto";
import { SearchInputDto } from "../../../@seedwork/application/dto/search-input";
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from "../../../@seedwork/application/dto/pagination-output";
import { CastMemberRepository } from "../../domain";
import { Types } from "../../domain/value-object/cast-member-type.vo";

export namespace ListCastMembersUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private castMemberRepository: CastMemberRepository.Repository
    ) {}

    public async execute(input: Input): Promise<Output> {
      const params = CastMemberRepository.SearchParams.create(input);
      const searchResult = await this.castMemberRepository.search(params);
      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: CastMemberRepository.SearchResult): Output {
      const items = searchResult.items.map((item) => {
        return CastMemberOutputMapper.toOutput(item);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }

  export type Input = SearchInputDto<{ name?: string; type?: Types }>;

  export type Output = PaginationOutputDto<CastMemberOutput>;
}
export default ListCastMembersUseCase;
