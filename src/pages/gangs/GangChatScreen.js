import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import ChatInput from '../../components/chat/ChatInput';
import GangChatContainer from '../../components/gang/ChatPage/GangChatContainer';
import { colors } from '../../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import ChatPageHeaderTitle from '../../components/gang/ChatPage/ChatPageHeaderTitle';
import ChatPageHeaderRight from '../../components/gang/ChatPage/ChatPageHeaderRight';
import io from 'socket.io-client';
import { SOCKET_URL } from '../../utils/constants/constants';
import { showToast } from '../../components/ui/Toast';
import Realm from 'realm';
import { realm } from '../../utils/models/relamConfig';

const GangChatScreen = ({ route, navigation }) => {
  const gangId = route.params.gang_id;
  const user = useSelector(state => state.auth.user);
  const [gang, setGang] = useState(null);
  const [socket, setSocket] = useState(null);
  const gangs = useSelector(state => state.gangs.gangs);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchedGang = gangs.find(g => g.gang_id === gangId);
    setGang(fetchedGang);
  }, [gangId, gangs]);

  useEffect(() => {
    // Load messages from the Realm database
    const storedMessages = realm
      .objects('GangMessage')
      .filtered(`gangId == "${gangId}"`);
    setMessages([...storedMessages]);

    // Listen for changes and update state
    storedMessages.addListener(() => {
      setMessages([...storedMessages]);
    });

    // Cleanup function
    return () => {
      storedMessages.removeAllListeners();
    };
  }, [gangId]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);

    newSocket.on('connect', () => {
      showToast(
        'success',
        'Connected!',
        'You are now connected to the server.',
      );
      joinRoom(newSocket);
    });

    newSocket.on('connect_error', () => {
      showToast(
        'error',
        'Connection Error',
        'Unable to connect to the server.',
      );
    });

    newSocket.on('joined', data => {
      console.log(data);
    });

    newSocket.on('receive_message', data => {
      setMessages(prevMessages => {
        // Ensure the new message isn't already in the list
        if (!prevMessages.some(message => message.id === data.id)) {
          // If it's not, add it to the list and return the updated list
          return [...prevMessages, data];
        }
    
        // If it is, just return the existing list
        return prevMessages;
      });
    
      // Save the new message to Realm
      storeMessageToRealm(data);
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.off('joined');
      newSocket.off('receive_message');
      newSocket.close();
    };
  }, []);

  function joinRoom(socketInstance) {
    const payload = {
      name: user.name,
      phone: user.phone,
      room: gangId,
    };
    socketInstance.emit('join', payload);
  }

  useLayoutEffect(() => {
    if (gang) {
      navigation.setOptions({
        headerTitle: () => <ChatPageHeaderTitle gang={gang} user={user} />,
        headerRight: () => <ChatPageHeaderRight />,
        headerStyle: {
          backgroundColor: colors.primary_color,
        },
      });
    }
  }, [navigation, gang]);

  function handleSendMessage(data) {
    if (socket) {
      data.gangId = gangId;
      socket.emit('message', data);
    }
  }

  function storeMessageToRealm(data) {
    try {
      realm.write(() => {
        realm.create('GangMessage', data, Realm.UpdateMode.Modified);
      });
    } catch (error) {
      console.error('Error storing message to Realm:', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {gang ? (
        <>
          <GangChatContainer messages={messages} phone={user.phone} />
          <ChatInput onSendMessage={handleSendMessage} user={user} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default GangChatScreen;