import { realm } from "../models/relamConfig";
import Realm from 'realm'

export function updateMessageLastUpdated(message) {
    try {
        // console.log("update",message);
        realm.write(() => {
          realm.create('GangMessageLastUpdated', {
            gang_id: message.gangId,
            epoch: message.epoch,
          }, Realm.UpdateMode.Modified);
        });
      } catch (error) {
        console.error('Error upserting GangMessageLastUpdated:', error);
      }
  }