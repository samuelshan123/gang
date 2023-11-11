export const GangMessageSchema = {
    name: 'GangMessage',
    primaryKey: 'id',
    properties: {
      id: 'string',
      content: 'string',
      contentType: 'string',
      senderName: 'string',
      senderPhone: 'string',
      gangId: 'string',
      epoch:'int'
    },
  };
  

  export const GangMessageLastUpdatedSchema = {
    name: 'GangMessageLastUpdated',
    primaryKey: 'gang_id',
    properties: {
      gang_id: 'string',
      epoch: 'int',
    },
  };
  