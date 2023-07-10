import { default as DefaultUseCase } from "../../../@seedwork/application/use-cases";
import { CastMemberRepository } from "../../domain";

export namespace DeleteCastMemberUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private castMemberRepository: CastMemberRepository.Repository
    ) {}

    public async execute(input: Input): Promise<void> {
      await this.castMemberRepository.delete(input.id);
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = void;
}

export default DeleteCastMemberUseCase;
