import React from 'react';
import { View,StyleSheet, FlatList } from 'react-native';
import GangMessageList from './GangMessageList';


const GangChatList = ({messages,phone}) => {
    function GangMessageUI(itemData){
        return(
            <GangMessageList item={itemData.item} phone={phone}/>
        )
    }
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={GangMessageUI}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15
  }
});

export default GangChatList;
