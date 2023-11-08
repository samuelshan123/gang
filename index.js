/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Realm from "realm";
import messaging from '@react-native-firebase/messaging';
Realm.flags.THROW_ON_GLOBAL_REALM = true;
import PushNotification from 'react-native-push-notification';

PushNotification.createChannel(
    {
      channelId: "gang-123", // (required)
      channelName: "gang", // (required)
      channelDescription: "A default channel", // (optional) default: undefined.
      // other properties...
    },
    (created) => console.log(`CreateChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
// Configure local notifications
PushNotification.configure({
    onNotification: function (notification) {
      console.log('LOCAL NOTIFICATION ==>', notification);
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
  
  // Handle background messages
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    // You can display a notification here if you want to show notifications when the app is in the background
    PushNotification.localNotification({
        channelId: "gang-123", // (required)
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
    });
  });
  

AppRegistry.registerComponent(appName, () => App);
