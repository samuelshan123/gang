import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import ChatInput from '../../components/chat/ChatInput';
import GangChatContainer from '../../components/gang/ChatPage/GangChatContainer';
import { colors } from '../../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import ChatPageHeaderTitle from '../../components/gang/ChatPage/ChatPageHeaderTitle';
import ChatPageHeaderRight from '../../components/gang/ChatPage/ChatPageHeaderRight';
import { realm } from '../../utils/realm/models/relamConfig';
import socketService from '../../utils/service/socketService';
import { addMessage } from '../../utils/redux/actions/gangActions';
import { subscribeToNotification } from '../../utils/push-notification/subscribeTopic';

const GangChatScreen = ({ route, navigation }) => {
  const gangId = route.params.gang_id;
  const user = useSelector(state => state.auth.user);
  const [gang, setGang] = useState(null);
  const gangs = useSelector(state => state.gangs.gangs);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(gangs);
    const fetchedGang = gangs.find(g => g.gang_id === gangId);
    setGang(fetchedGang);
  }, [gangId, gangs]);

// useEffect(()=>{
//   if(!gang?.is_notification_subscribed){
//     subscribeToNotification(gang);
//   }
// })
  useLayoutEffect(() => {
    // Set up navigation options
    if (gang) {
      navigation.setOptions({
        headerTitle: () => <ChatPageHeaderTitle gang={gang} user={user} />,
        headerRight: () => <ChatPageHeaderRight gang={gang} user={user} />,
        headerStyle: { backgroundColor: colors.primary_color },
      });
    }
  }, [navigation, gang]);


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

  function handleSendMessage(data) {
    // Construct message data
    const messageData = { ...data, gangId, userId: user.id };
    // Dispatch an action to add the message to Redux
    dispatch(addMessage(gangId, messageData));
    socketService.emit('message', messageData);
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
