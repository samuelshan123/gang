import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { FAB } from 'react-native-paper';
import GangList from '../../components/gang/GangList';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../components/ui/Toast';
import { setGangs, setMessages } from '../../utils/redux/actions/gangActions';
import { realm } from '../../utils/realm/models/relamConfig';
import { fetchData, postData } from '../../utils/api/api';
import Realm from "realm";
import {requestUserPermission,NotificationListener} from '../../utils/push-notification/notification-helper'
import socketService from '../../utils/service/socketService';

const Gangs = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [realmGangs, setRealmGangs] = useState([]);
  const user = useSelector((state) => state.auth.user);

  // Function to fetch gangs from Realm
  const fetchGangsFromRealm = () => {
    return realm.objects('Gang');
  };

  // Function to fetch the last updated epoch for each gang from Realm
  const fetchLastUpdatedEpochs = () => {
    const lastUpdates = realm.objects('GangMessageLastUpdated');
    return lastUpdates.map(lu => ({ gang_id: lu.gang_id, epoch: lu.epoch }));
  };
  
  useEffect(()=>{
    requestUserPermission();
    NotificationListener();
  },[])

    useEffect(() => {
      // Set up global Socket.io event listeners
      // Example: Handling global notifications
      socketService.on('global_notification', (notification) => {
        // Process the notification
        console.log(notification);
      });
  
      return () => {
        // Cleanup global listeners when the component unmounts
        socketService.off('global_notification');
      };
    }, []);
  

  useEffect(() => {
    const gangs = fetchGangsFromRealm();
    setRealmGangs(gangs);

    // Listen for changes in the Realm database
    const listener = (collection, changes) => {
      setRealmGangs([...collection]);
    };
    
    gangs.addListener(listener);

    // Cleanup listener when component unmounts
    return () => {
      gangs.removeListener(listener);
    };
  }, []);

  useEffect(() => {
    const fetchGangsAndUpdateMessages = async () => {
      setLoading(true);
      try {
        // Fetch gangs from the server
        const gangsResponse = await fetchData(`gang/fetchGangs/${user.phone}`);
        if (gangsResponse.status === 200) {
          // Update Realm database with fetched gangs
          realm.write(() => {
            gangsResponse.gangs.forEach(gang => {
              realm.create('Gang', gang, Realm.UpdateMode.Modified);
            });
          });

          dispatch(setGangs(gangsResponse.gangs));

          // Fetch and update messages for each gang
          let payload;
          const lastUpdatedEpochs = fetchLastUpdatedEpochs();
          if(!lastUpdatedEpochs.length){
             payload = gangsResponse.gangs.map(gang => ({ gang_id: gang.gang_id, epoch: 0 }));
          }
          else{
            payload = lastUpdatedEpochs;
          }
          if (payload.length > 0) { // Ensure that the array is not empty
            const messagesResponse = await postData('gang/messages', { gangs: payload });
            if (messagesResponse.status === 200) {
              // Update Realm database with fetched messages
              realm.write(() => {
                messagesResponse.messages.forEach(message => {
                  realm.create('GangMessage', message, Realm.UpdateMode.Modified);
                  dispatch(setMessages(message.gangId, message));
                    // Find the corresponding gang and increment the unread count
                    let gang = realm.objectForPrimaryKey('Gang', message.gangId);
                    if (gang) {
                      gang.unread_count = (gang.unread_count || 0) + 1; // Increment unread count
                    }
  
                  // Update the GangMessageLastUpdated with the new epoch
                  let lastUpdate = realm.objectForPrimaryKey('GangMessageLastUpdated', message.gangId);
                  if (lastUpdate) {
                    lastUpdate.epoch = message.epoch; // Assuming 'epoch' is a field in your message
                  } else {
                    // Create a new GangMessageLastUpdated if it doesn't exist
                    realm.create('GangMessageLastUpdated', {
                      gang_id: message.gangId,
                      epoch: message.epoch, // Use the epoch from the new message
                    });
                  }
                });
              });
            } else {
              showToast('error', 'Oops!', messagesResponse.info);
            }
          }
        } else {
          showToast('error', 'Oops!', gangsResponse.info);
        }
      } catch (err) {
        console.error('Error fetching data:', err.message);
        showToast('error', 'Oops!', err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchGangsAndUpdateMessages();
  }, [user.phone, dispatch]);

  // Rest of your component remains unchanged
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Use realmGangs instead of gangList */}
        <GangList gangList={realmGangs} />
      </View>

      <FAB.Group
        open={open}
        color="white"
        fabStyle={{ backgroundColor: colors.primary_color }}
        icon={open ? 'close' : 'plus'}
        backdropColor="transparent"
        actions={[
          {
            icon: 'plus',
            color: 'white',
            label: 'Create',
            labelStyle: { fontFamily: fonts.primary },
            style: { backgroundColor: colors.primary_color },
            onPress: () =>  navigation.navigate('Create Gang',{
              user
            }),
          },
          {
            icon: 'account-group',
            color: 'white',
            label: 'Join',
            labelStyle: { fontFamily: fonts.primary },
            style: { backgroundColor: colors.primary_color },
            onPress: () => navigation.navigate('Join Gang', {
              user
            }),
          },
        ]}
        onStateChange={({ open }) => setOpen(open)}
      />
    </SafeAreaView>
  );
};

export default Gangs;
