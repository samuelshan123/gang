import React, { memo, useCallback, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import GangMessageList from './GangMessageList';

const GangMessageListItem = memo(({ item, phone ,onSwipe }) => (
  <GangMessageList item={item} phone={phone} onSwipe={onSwipe} />
));

const GangChatList = ({ messages, phone, loadOlderMessages ,onSwipe }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const renderMessage = useCallback(({ item }) => (
    <GangMessageListItem item={item} phone={phone} onSwipe={onSwipe} />
  ), [phone,onSwipe]);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages.slice().reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
        inverted
        onEndReached={loadOlderMessages}
        onEndReachedThreshold={0.5}
        initialNumToRender={15}
        showsVerticalScrollIndicator={isScrolling}
        onScrollBeginDrag={() => setIsScrolling(true)}
        onScrollEndDrag={() => setIsScrolling(false)}
        // Consider using onMomentumScrollBegin and onMomentumScrollEnd for smoother experience
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:15,
  }
});

export default GangChatList;
