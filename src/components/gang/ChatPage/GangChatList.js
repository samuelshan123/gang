import React, { useRef } from 'react';
import { View,StyleSheet, FlatList } from 'react-native';
import GangMessageList from './GangMessageList';


const GangChatList = ({messages,phone}) => {
  const flatListRef = useRef(); // Create a ref for the FlatList

    function GangMessageUI(itemData){
        return(
            <GangMessageList item={itemData.item} phone={phone}/>
        )
    }
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef} // Attach the ref to the FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={GangMessageUI}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
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
