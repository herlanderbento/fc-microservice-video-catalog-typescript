import { CastMember } from "#cast-member/domain";
import { CastMemberInMemoryRepository } from "#cast-member/infra/db/in-memory/cast-member-in-memory.repository";
import { NotFoundError } from "#seedwork/domain";
import GetCastMemberUseCase from "../../get-cast-member.use-case";

describe("GetCastMemberUseCase Unit Tests", () => {
  let useCase: GetCastMemberUseCase.UseCase;
  let repository: CastMemberInMemoryRepository;

  beforeEach(() => {
    repository = new CastMemberInMemoryRepository();
    useCase = new GetCastMemberUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
  });

  it("should returns a cast member", async () => {
    const castMember = CastMember.fake().anActor().build();
    const items = [castMember];
    repository.items = items;
    const spyFindById = jest.spyOn(repository, "findById");
    const output = await useCase.execute({ id: castMember.id });

    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: castMember.id,
      name: castMember.name,
      type: castMember.type.value,
      created_at: castMember.created_at,
    });
  });
});
