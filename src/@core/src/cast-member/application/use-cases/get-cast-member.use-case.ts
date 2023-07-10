import CastMemberRepository from "../../domain/repository/cast-member.repository";
import { default as DefaultUseCase } from "../../../@seedwork/application/use-cases";
import { CastMemberOutput, CastMemberOutputMapper } from "../dto";

export namespace GetCastMemberUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private castMemberRepository: CastMemberRepository.Repository
    ) {}

    public async execute(input: Input): Promise<Output> {
      const entity = await this.castMemberRepository.findById(input.id);
      return CastMemberOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = CastMemberOutput;
}

export default GetCastMemberUseCase;
