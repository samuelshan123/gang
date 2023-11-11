import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import ChatInput from '../../components/chat/ChatInput';
import GangChatContainer from '../../components/gang/ChatPage/GangChatContainer';
import { colors } from '../../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import ChatPageHeaderTitle from '../../components/gang/ChatPage/ChatPageHeaderTitle';
import ChatPageHeaderRight from '../../components/gang/ChatPage/ChatPageHeaderRight';
import Realm from 'realm';
import { realm } from '../../utils/realm/models/relamConfig';
import socketService from '../../utils/service/socketService';

const GangChatScreen = ({ route, navigation }) => {
  const gangId = route.params.gang_id;
  const user = useSelector(state => state.auth.user);
  const [gang, setGang] = useState(null);
  const gangs = useSelector(state => state.gangs.gangs);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log(gangs);
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
    // Fetch and set the current gang
    // const fetchedGang = useSelector(state => state.gangs.gangs).find(g => g.gangId === gangId);
    // console.log("Fetched gang",fetchedGang);
    // setGang(fetchedGang);

    // Join the room
    const payload = {
      name: user.name,
      phone: user.phone,
      room: gangId,
    };
    socketService.joinRoom(payload);

    // Cleanup on unmount
    return () => {
      socketService.leaveRoom(payload);
    };
  }, [gangId, user]);

  useEffect(() => {
    // Set up navigation options
    if (gang) {
      navigation.setOptions({
        headerTitle: () => <ChatPageHeaderTitle gang={gang} user={user} />,
        headerRight: () => <ChatPageHeaderRight />,
        headerStyle: { backgroundColor: colors.primary_color },
      });
    }
  }, [navigation, gang]);

  function handleSendMessage(data) {
    // Construct message data
    const messageData = { ...data, gangId, userId: user.id }; // Add other necessary fields

    // Dispatch an action to add the message to Redux
    dispatch(addMessage(gangId, messageData));

    // Save the message to Realm
    // storeMessageToRealm(messageData);

    // Emit the message over the socket
    socketService.emit('message', messageData);
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
      <GangChatContainer messages={messages} phone={user.phone} />
      <ChatInput onSendMessage={handleSendMessage} user={user} />
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
