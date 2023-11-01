
class GangsModel {}
GangsModel.schema = {
  name: 'GangList',
  primaryKey: 'id',
  properties: {
    id: 'int',
    gang: 'string',
    epoch:'int'
   
  },
};

export default GangsModel;