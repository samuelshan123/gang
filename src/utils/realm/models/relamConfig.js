import { GangMessageLastUpdatedSchema, GangMessageSchema } from './gangMessages';
import { GangSchema, LastMessageInfoSchema, MemberSchema } from './gangs';
import Realm from "realm";

export const realm = new Realm({ schema: [GangSchema,GangMessageSchema,MemberSchema,LastMessageInfoSchema,GangMessageLastUpdatedSchema] });
