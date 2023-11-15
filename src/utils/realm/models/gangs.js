
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
    unread_count:'int',
    last_message: 'LastMessageInfo'
  },
  primaryKey: 'gang_id',
};

export const LastMessageInfoSchema = {
  name: 'LastMessageInfo',
  properties: {
      id: 'string?',
      content: 'string?',
      contentType: 'string?',
      senderName: 'string?',
      senderPhone: 'string?',
      gangId: 'string?',
      epoch:'int?'
  },
};

export const MemberSchema = {
  name: 'Member',
  properties: {
    name: 'string',
    phone: 'string',
    role: 'string',
  },
};
