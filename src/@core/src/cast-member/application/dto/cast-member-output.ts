import { CastMember, Types } from "../../domain";

export type CastMemberOutput = {
  id: string;
  name: string;
  type: Types;
  created_at: Date;
};

export class CastMemberOutputMapper {
  public static toOutput(entity: CastMember): CastMemberOutput {
    return entity.toJSON();
  }
}
