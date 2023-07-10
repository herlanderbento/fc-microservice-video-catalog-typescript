import {
  CastMemberType,
  Types,
} from "../../domain/value-object/cast-member-type.vo";
import { default as DefaultUseCase } from "../../../@seedwork/application/use-cases";
import { CastMemberOutput, CastMemberOutputMapper } from "../dto";
import { CastMember, CastMemberRepository } from "../../domain";
import { EntityValidationError } from "../../../@seedwork/domain/errors/validation-error";

export namespace CreateCastMemberUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private castMemberRepository: CastMemberRepository.Repository
    ) {}

    public async execute(input: Input): Promise<Output> {
      const [type, errorCastMemberType] = CastMemberType.create(input.type);

      try {
        const entity = new CastMember({
          ...input,
          type,
        });

        await this.castMemberRepository.insert(entity);
        return CastMemberOutputMapper.toOutput(entity);
      } catch (error) {
        this.handleError(error, errorCastMemberType);
      }
    }

    private handleError(e: Error, errorCastMemberType: Error | undefined) {
      if (e instanceof EntityValidationError) {
        e.setFromError("type", errorCastMemberType);
      }

      throw e;
    }
  }

  export type Input = {
    name: string;
    type: Types;
  };

  export type Output = CastMemberOutput;
}
