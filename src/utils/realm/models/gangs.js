
// Define your Gang schema
export const GangSchema = {
  name: 'Gang',
  properties: {
    gang_name: 'string',
    description: 'string',
    phone: 'string',
    name: 'string',
    gang_id: 'string',
    epoch: 'int',
    members: 'Member[]',
    created_by: 'string',
    unread_count:'int'
  },
  primaryKey: 'gang_id',
};

export const MemberSchema = {
  name: 'Member',
  properties: {
    name: 'string',
    phone: 'string',
    role: 'string',
  },
};
