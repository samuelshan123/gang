import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Badge } from 'react-native-paper';
import { fonts } from '../../theme/fonts';
import { realm } from '../../utils/realm/models/relamConfig';
import { colors } from '../../theme/colors';

const GangListTile = ({ item }) => {
  const navigation = useNavigation();

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
            {/* <Text style={styles.date}>{'today'}</Text>  */}
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{item.description}</Text>
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
    fontSize: 16,
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
