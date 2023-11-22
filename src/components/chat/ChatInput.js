import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../theme/colors';
import { fonts } from '../../theme/fonts';

const ChatInput = ({onSendMessage, user, replyTo, onDismissReply}) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message) {
      const payload = {
        content: message,
        contentType: 'text',
        senderName: user.name,
        senderPhone: user.phone,
      };
      onSendMessage(payload);
      setMessage(''); // Clear input after sending
      if (replyTo) {
        onDismissReply(); // Clear reply state if replying
      }
    }
  };

  return (
    <View>
      {replyTo && (
        <View style={styles.replyToContainer}>
          <View style={styles.replyToTextWrapper}>
            <Text style={styles.replyToSender}>{replyTo.senderName}</Text>
            <Text style={styles.replyToText}>{replyTo.content}</Text>
          </View>
          <TouchableOpacity onPress={onDismissReply} style={styles.closeButton}>
            <Icon name="close" size={20} color="#888" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.leftIconButton}>
            <Icon name="emoji-emotions" size={24} color="#888" />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Message"
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity style={styles.rightIconButton}>
            <Icon
              style={{transform: [{rotate: '-45deg'}]}}
              name="attach-file"
              size={24}
              color="#888"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.rightIconButton}>
            <Icon name="camera-alt" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {message ? (
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}>
            <Icon name="send" size={22} color="#FFF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.sendButton}>
            <Icon name="mic" size={24} color="#FFF" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 10,
    backgroundColor: colors.background_color,
  },
  replyToContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 5,
    height:60,
    borderColor:colors.primary_color,
    borderWidth:2
  },
  replyToText: {
    flex: 1,
    marginRight: 10,
    // Add additional styling as needed
  },
  replyToTextWrapper: {
    flex: 1,
    marginRight: 10,
  },
  replyToSender: {
    fontFamily:fonts.primary,
    color: colors.primary_color, // Dark text for sender's name
    fontSize: 12, // Adjust font size as needed
  },
  replyToText: {
    color: '#555', // Slightly lighter text for message content
    fontSize: 16, // Adjust font size as needed
  },
  closeButton: {
    padding: 5,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  leftIconButton: {
    padding: 5,
  },
  rightIconButton: {
    padding: 5,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  sendButton: {
    backgroundColor: colors.primary_color,
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});

export default ChatInput;
