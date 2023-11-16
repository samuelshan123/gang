import React from 'react';
import {FlatList} from 'react-native';
import GangListTile from './GangListTile';

const GangList = ({gangList,phone}) => {
//  console.log(gangList);
  function listUI(itemData) {
    return (
      <GangListTile item={itemData.item} phone={phone} />
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
