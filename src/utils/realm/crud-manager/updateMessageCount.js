import { realm } from "../models/relamConfig";

export async function updateUnreadMessageCount(data){
    realm.write(() => {
        let gang = realm.objectForPrimaryKey('Gang', data.gangId);
        if (gang) {
          gang.unread_count = (gang.unread_count || 0) + 1;
        }
      });
}