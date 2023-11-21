import messaging from '@react-native-firebase/messaging';
import { realm } from '../realm/models/relamConfig';

export const subscribeToNotification = async (gangData) => {
  if (!gangData.is_notification_subscribed) {
    try {
      // Subscribe to the Firebase topic
      await messaging().subscribeToTopic(gangData.gang_id);

      // Get the gang object from Realm
      const gangToUpdate = realm.objectForPrimaryKey('Gang', gangData.gang_id);;    
      if (gangToUpdate) {
        realm.write(() => {
          gangToUpdate.is_notification_subscribed = true;
        });
        console.log(`Subscribed to notifications for gang: ${gangToUpdate.gang_id}`);
      }
    } catch (error) {
      console.error("Error subscribing to notifications: ", error);
    }
  }
};
