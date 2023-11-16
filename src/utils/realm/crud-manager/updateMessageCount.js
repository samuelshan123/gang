import { realm } from "../models/relamConfig";

export async function updateUnreadMessageCount(data){
    realm.write(() => {
        let gang = realm.objectForPrimaryKey('Gang', data.gangId);
        if (gang) {
            const {id,content,contentType,senderName,senderPhone,gangId,epoch,} = data;
            gang.last_message = {id,content,contentType,senderName,senderPhone,gangId,epoch,};
          gang.unread_count = (gang.unread_count || 0) + 1;
        }
      });
}

export async function updateUnreadMessage(data){
  realm.write(() => {
      let gang = realm.objectForPrimaryKey('Gang', data.gangId);
      if (gang) {
          const {id,content,contentType,senderName,senderPhone,gangId,epoch,} = data;
          gang.last_message = {id,content,contentType,senderName,senderPhone,gangId,epoch,};
      }
    });
}