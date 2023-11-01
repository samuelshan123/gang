import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';

const ChatInput = ({onSendMessage,user}) => {
  const [message, setMessage] = useState('');

 
  const handleSendMessage = () => {
    if (message) {
      const payload = {
        content:message,
        contentType:'text',
        senderName:user.name,
        senderPhone:user.phone
      }
      onSendMessage(payload);
      setMessage(''); // Clear input after sending
    }
  };
 
  return (
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
          <Icon  style={{ transform: [{ rotate: '-45deg' }] }} name="attach-file" size={24} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.rightIconButton}>
          <Icon name="camera-alt" size={24} color="#888" />
        </TouchableOpacity>

      </View>

      {message ? (
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Icon name="send" size={22} color="#FFF" />
        </TouchableOpacity>
      ):  <TouchableOpacity  style={styles.sendButton}>
      <Icon name="mic" size={24} color="#FFF" />
    </TouchableOpacity>
    }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 10,
    backgroundColor:colors.background_color,

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
