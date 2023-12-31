import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFcmToken();
  }
}


export async function GetFcmToken(){
    let fcmToken = await AsyncStorage.getItem("fcmtoken");
    if(!fcmToken){
        try {
             const token = await messaging().getToken();
             if(token){
                console.log("fcmToken",token);
                AsyncStorage.setItem("fcmtoken",token);
             }
        } catch (error) {
            console.error(error);
        }
    }
    else{
      console.log("Existing FCM token:", fcmToken);
    }
}

export const NotificationListener =()=>{

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });

       // Check whether an initial notification is available
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

    messaging().onMessage(async(remoteMessage)=>{
       console.log("Notification on foreground",remoteMessage);
       PushNotification.localNotification({
        channelId: "gang-123", // (required)
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
      });
    })
    
}