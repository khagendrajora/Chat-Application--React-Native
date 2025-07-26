import { Image } from "expo-image";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { db } from "../firebaseConfig";
import { blurhash, formatDate, getRoomdId } from "../uitls/common";

export default function ChatItem({ item, router, currentUser }) {
  const openChatRoom = () => {
    router.push({ pathname: "/chatRoom", params: item });
  };

  const [lastMessage, setLastMessage] = useState(undefined);

  useEffect(() => {
    let roomId = getRoomdId(currentUser?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesref = collection(docRef, "messages");
    const q = query(messagesref, orderBy("createdAt", "desc"));
    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setLastMessage(allMessages[0] ? allMessages[0] : null);
    });
    return unsub;
  }, []);

  const renderTime = () => {
    if (lastMessage) {
      let date = lastMessage?.createdAt;
      return formatDate(new Date(date?.seconds * 1000));
    }
  };
  const renderLastMessage = () => {
    if (typeof lastMessage == "undefined") return "loading..";
    if (lastMessage) {
      if (currentUser?.userId === lastMessage?.userId) {
        return "You: " + lastMessage?.text;
      } else {
        return lastMessage?.text;
      }
    } else {
      return "hi";
    }
  };
  // console.log("lastmessage", lastMessage);

  return (
    <TouchableOpacity
      onPress={openChatRoom}
      className="flex-row justify-between items-center gap-3 mb-4 mx-4 pb-2 border-b border-neutral-200"
    >
      <Image
        source={item?.profileUrl}
        placeholder={blurhash}
        style={{
          height: hp(5),
          width: hp(6),
          borderRadius: 100,
          aspectRatio: 1,
        }}
        transition={500}
      />
      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text style={{ height: hp(3) }}>{item.username}</Text>
          <Text style={{ height: hp(2.5) }} className="text-neutral-500">
            {renderTime()}
          </Text>
        </View>
        <Text style={{ height: hp(2.5) }} className="text-neutral-500">
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
