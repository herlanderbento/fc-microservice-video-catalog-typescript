import { CastMemberType } from "#cast-member/domain/value-object/cast-member-type.vo";
import { CastMember, CastMemberId, CastMemberProperties } from "../cast-member";

describe("CastMember Unit Tests", () => {
  beforeEach(() => {
    CastMember.validate = jest.fn();
  });

  test("constructor of cast member", () => {
    const director = CastMemberType.createADirector();
    let castMember = new CastMember({
      name: "test",
      type: director,
    });

    expect(CastMember.validate).toHaveBeenCalled();
    expect(castMember.props).toStrictEqual({
      name: "test",
      type: director,
      created_at: castMember.props.created_at,
    });
    expect(castMember.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date(); //string
    castMember = new CastMember({
      name: "test",
      type: director,
      created_at,
    });
    expect(castMember.props).toStrictEqual({
      name: "test",
      type: director,
      created_at,
    });
  });

  describe("id field", () => {
    type CastMemberData = { props: CastMemberProperties; id?: CastMemberId };
    const actor = CastMemberType.createADirector();
    const arrange: CastMemberData[] = [
      { props: { name: "Movie", type: actor } },
      { props: { name: "Movie", type: actor }, id: null },
      { props: { name: "Movie", type: actor }, id: undefined },
      { props: { name: "Movie", type: actor }, id: new CastMemberId() },
    ];

    test.each(arrange)("when props is %j", (item) => {
      const castMember = new CastMember(item.props, item.id as any);
      expect(castMember.id).not.toBeNull();
      expect(castMember.entityId).toBeInstanceOf(CastMemberId);
    });
  });

  it("should update a cast member", () => {
    const director = CastMemberType.createADirector();
    const castMember = new CastMember({ name: "test", type: director });
    const actor = CastMemberType.createAnActor();
    castMember.update("test1", actor);
    
    expect(CastMember.validate).toHaveBeenCalledTimes(2);
    expect(castMember.name).toBe("test1");
    expect(castMember.type).toEqual(actor);
  });
});
