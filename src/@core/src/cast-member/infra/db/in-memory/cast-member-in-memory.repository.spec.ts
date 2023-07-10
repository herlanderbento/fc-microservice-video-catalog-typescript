import { CastMember, CastMemberType } from "#cast-member/domain";
import { CastMemberInMemoryRepository } from "./cast-member-in-memory.repository";

describe("CastMemberInMemoryRepository", () => {
  let repository: CastMemberInMemoryRepository;

  beforeEach(() => (repository = new CastMemberInMemoryRepository()));

  it("should no filter items when filter object is null", async () => {
    const items = [
      CastMember.fake().anActor().build(),
      CastMember.fake().aDirector().build(),
    ];
    const filterSpy = jest.spyOn(items, "filter");

    let itemsFiltered = await repository["applyFilter"](items, null);
    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });

  it("should filter items by name", async () => {
    const items = [
      CastMember.fake().anActor().withName("test").build(),
      CastMember.fake().anActor().withName("TEST").build(),
      CastMember.fake().anActor().withName("fake").build(),
    ];
    const filterSpy = jest.spyOn(items, "filter");
    let itemsFiltered = await repository["applyFilter"](items, {
      name: "TEST",
    });
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
  });

  it("should filter items by type", async () => {
    const items = [
      CastMember.fake().anActor().build(),
      CastMember.fake().aDirector().build(),
    ];
    const filterSpy = jest.spyOn(items, "filter");

    let itemsFiltered = await repository["applyFilter"](items, {
      type: CastMemberType.createAnActor(),
    });
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(itemsFiltered).toStrictEqual([items[0]]);

    itemsFiltered = await repository["applyFilter"](items, {
      type: CastMemberType.createADirector(),
    });
    expect(filterSpy).toHaveBeenCalledTimes(2);
    expect(itemsFiltered).toStrictEqual([items[1]]);
  });

  it("should filter items by name and type", async () => {
    const items = [
      CastMember.fake().anActor().withName("test").build(),
      CastMember.fake().anActor().withName("fake").build(),
      CastMember.fake().aDirector().build(),
      CastMember.fake().aDirector().withName("test fake").build(),
    ];

    let itemsFiltered = await repository["applyFilter"](items, {
      name: "test",
      type: CastMemberType.createAnActor(),
    });
    expect(itemsFiltered).toStrictEqual([items[0]]);
  });

  it("should sort by created_at when sort param is null", async () => {
    const items = [
      CastMember.fake()
        .anActor()
        .withName("test")
        .withCreatedAt(new Date())
        .build(),
      CastMember.fake()
        .anActor()
        .withName("TEST")
        .withCreatedAt(new Date(new Date().getTime() + 1))
        .build(),
      CastMember.fake()
        .anActor()
        .withName("fake")
        .withCreatedAt(new Date(new Date().getTime() + 2))
        .build(),
    ];
    let itemsSorted = await repository["applySort"](items, null, null);
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });

  it("should sort by name", async () => {
    const items = [
      CastMember.fake().anActor().withName("c").build(),
      CastMember.fake().anActor().withName("b").build(),
      CastMember.fake().anActor().withName("a").build(),
    ];

    let itemsSorted = await repository["applySort"](items, "name", "asc");
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);

    itemsSorted = await repository["applySort"](items, "name", "desc");
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
  });
});
