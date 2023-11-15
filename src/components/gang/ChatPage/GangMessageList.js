import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { fonts } from '../../../theme/fonts';
import { colors } from '../../../theme/colors';

const GangMessageList = ({ item, phone }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isSender = item.senderPhone === phone;
  const MAX_LENGTH = 600; // Set a limit for when to show "Read More"
  const shouldShowReadMore = item.content.length > MAX_LENGTH && !isExpanded;

  const convertTime = (epoch) => {
    return new Date(epoch).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={isSender ? styles.rightMsgContainer : styles.leftMsgContainer}>
      {!isSender && (item.avatar ? (
        <Avatar.Image size={25} source={{uri: item.avatar}} style={styles.avatar} />
      ) : (
        <Avatar.Text size={25} labelStyle={styles.avatarText} label={item.senderName.charAt(0)} style={styles.avatar} />
      ))}

      <View style={isSender ? styles.rightMsg : styles.leftMsg}>
        {!isSender && <Text style={styles.senderName}>{item.senderName}</Text>}
        <View style={styles.messageContent}>
          <Text style={styles.msgText} numberOfLines={isExpanded ? undefined : 15}>
            {item.content}
          </Text>
          {shouldShowReadMore && (
            <TouchableOpacity style={{textAlign:'right'}} onPress={() => setIsExpanded(true)}>
              <Text style={styles.readMoreText}>Read More</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.timeText}>{convertTime(item.epoch)}</Text>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  leftMsgContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  rightMsgContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  avatar: {
    marginRight: 10,
  },
  avatarText: {
    fontFamily: fonts.primary,
    color: 'white',
    textAlign: 'center',
    lineHeight: 15,
  },
  leftMsg: {
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    position: 'relative',
  },
  rightMsg: {
    padding: 8,
    backgroundColor: '#DCF8C7',
    borderRadius: 8,
    borderBottomRightRadius: 2,
    maxWidth: '70%',
  },
  msgText: {
    fontSize: 16,
    color: '#222',
    fontFamily: fonts.primary,
  },
  senderName: {
    fontSize: 12,
    color: colors.primary_color,
    marginBottom: 1,
    fontFamily: fonts.primary,
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },
  readMoreText: {
    color: '#027eb5',
    fontFamily: fonts.primary,
    fontSize: 12,
    marginTop: 5,
    textAlign:'right'
  },
  timeText: {
    fontSize: 10,
    color: '#888',
    paddingLeft: 5,
    fontFamily: fonts.primary,
  },
});

export default GangMessageList;
