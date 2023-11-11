import { realm } from "../models/relamConfig";
import Realm from 'realm';


export function insertGangMessage(data) {
    try {
      realm.write(() => {
        realm.create('GangMessage', data, Realm.UpdateMode.Modified);
      });
    } catch (error) {
      console.error('Error storing message to Realm:', error);
    }
  }