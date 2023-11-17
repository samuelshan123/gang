import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Badge } from 'react-native-paper';
import { fonts } from '../../theme/fonts';
import { realm } from '../../utils/realm/models/relamConfig';
import { colors } from '../../theme/colors';

const GangListTile = ({ item ,phone }) => {
  const navigation = useNavigation();

  const formatDate = (epoch) => {
    const messageDate = new Date(epoch); // Convert epoch to milliseconds
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
  
    // Check if the message date is today
    if (messageDate >= currentDate) {
      return messageDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }
  
    // Check if the message date was yesterday
    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    if (messageDate >= yesterday) {
      return 'Yesterday';
    }
  
    // Otherwise, return the actual date
    return messageDate.toLocaleDateString();
  };

  function navigateToChat() {
    realm.write(() => {
      let gang = realm.objectForPrimaryKey('Gang', item.gang_id);
      if (gang) {
        gang.unread_count = 0; // Reset unread count
      }
    });

    navigation.navigate('GangChat', {
      gang_id: item.gang_id
    });
  }

  return (
    <Pressable onPress={navigateToChat}>
      <View style={styles.itemContainer}>
        <Avatar.Text size={30} label={item.gang_name.charAt(0)} style={styles.avatar} />
        <View style={styles.textContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.gang}>{item.gang_name}</Text>
            <Text style={styles.date}>{formatDate(item.last_message?.epoch)}</Text> 
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{phone === item.last_message?.senderPhone ? 'You': item.last_message?.senderName}: {item.last_message?.content}</Text>
            {item?.unread_count!=0 &&
            <Badge style={styles.badge}>{item.unread_count}</Badge>}
          </View>
        </View>
      </View>
    </Pressable>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: fonts.primary
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
  gang: {
    fontSize: 18,
    fontFamily: fonts.primary_bold
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    color: 'gray',
    fontFamily: fonts.primary
  },
  date: {
    fontSize: 14,
    color: 'gray',
    fontFamily: fonts.primary
  },
  badge: {
    backgroundColor:colors.primary_color
  },
});

export default GangListTile;
