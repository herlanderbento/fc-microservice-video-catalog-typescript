import { CastMember } from "#cast-member/domain";
import { CastMemberInMemoryRepository } from "#cast-member/infra/db/in-memory/cast-member-in-memory.repository";
import { NotFoundError } from "#seedwork/domain";
import DeleteCastMemberUseCase from "../../delete-cast-member.use-case";

describe("DeleteCastMemberUseCase Unit Test", () => {
  let useCase: DeleteCastMemberUseCase.UseCase;
  let repository: CastMemberInMemoryRepository;

  beforeEach(() => {
    repository = new CastMemberInMemoryRepository();
    useCase = new DeleteCastMemberUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
  });

  it("should delete a cast member", async () => {
    const castMember = CastMember.fake().anActor().build();
    const items = [castMember];
    repository.items = items;
    await useCase.execute({
      id: castMember.id,
    });
    expect(repository.items).toHaveLength(0);
  });
});
