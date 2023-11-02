import { GangMessageSchema } from './gangMessages';
import { GangSchema, MemberSchema } from './gangs';
import Realm from "realm";

export const realm = new Realm({ schema: [GangSchema,GangMessageSchema,MemberSchema] });
