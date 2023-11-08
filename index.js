/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Realm from "realm";
import messaging from '@react-native-firebase/messaging';
Realm.flags.THROW_ON_GLOBAL_REALM = true;

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    // Additional background message handling tasks
  });
  
AppRegistry.registerComponent(appName, () => App);
