import React from 'react';
import {FlatList} from 'react-native';
import GangListTile from './GangListTile';

const GangList = ({gangList}) => {
//  console.log(gangList);
  function listUI(itemData) {
    return (
      <GangListTile item={itemData.item} />
    );
  }
  return (
    <FlatList
      data={gangList}
      renderItem={listUI}
      keyExtractor={item => item.gang_id}
    />
  );
};

export default GangList;
