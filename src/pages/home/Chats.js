import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

const DATA = [
  { id: '1', userName: 'Alice', lastMessage: 'Hey, how are you?', date: '15:30' },
  { id: '2', userName: 'Bob', lastMessage: 'Lets catch up!', date: '14:45' },
  { id: '3', userName: 'Charlie', lastMessage: 'Check this out!', date: 'Yesterday' },
  // ... Add more chat data as needed
];

const Chats = () => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.userName.charAt(0)}</Text>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.userName}>{item.userName}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <Text style={styles.message}>{item.lastMessage}</Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#b0e57c',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    color: 'gray',
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Chats;
