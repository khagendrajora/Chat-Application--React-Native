import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Keyboard, TextInput, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import CustomKeyboardView from "../../components/CustomKeybordView";
import MessageList from "../../components/MessageList";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebaseConfig";
import { getRoomdId } from "../../uitls/common";

export default function ChatRoom() {
  const item = useLocalSearchParams(); // second user
  const { user } = useAuth(); //logined user
  const router = useRouter();
  const [messages, setMessage] = useState([]);
  const textRef = useRef();
  const inputRef = useRef();
  const scrollView = useRef(null);

  useEffect(() => {
    createRoomIfNotExists();
    let roomId = getRoomdId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesref = collection(docRef, "messages");
    const q = query(messagesref, orderBy("createdAt", "asc"));
    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessage([...allMessages]);
    });

    const KeyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      updateScrollView
    );
    return () => {
      unsub();
      KeyboardDidShowListener.remove();
    };
  }, []);

  const createRoomIfNotExists = async () => {
    let roomId = getRoomdId(user?.userId, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomdId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);

      const messageRef = collection(docRef, "messages");
      textRef.current = "";
      if (inputRef) inputRef?.current?.clear();
      const newDoc = await addDoc(messageRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      Alert.alert("Message", error.message);
    }
  };

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  const updateScrollView = () => {
    setTimeout(() => {
      scrollView?.current?.scrollToEnd({ animated: true });
    }, 100);
  };
  // console.log("mesage", messages);
  return (
    <CustomKeyboardView inChat={true}>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />
        <View className="flex-1 justify-between bg-neutral-400 overflow-visible">
          <View className="flex-1">
            <MessageList
              scrollViewRef={scrollView}
              messages={messages}
              currentUser={user}
            />
          </View>
          <View style={{ marginBottom: hp(1.7) }} className="pt-2">
            <View className="flex-row justify-between bg-white border p-2  border-neutral-300 rounded-full pl-5 ">
              <TextInput
                ref={inputRef}
                onChangeText={(value) => (textRef.current = value)}
                placeholder="Type message..."
                className="flex-1 mr-2"
                style={{
                  fontSize: hp(2),
                }}
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                className="bg-neutral-200 p-2 mr-1 rounded-full"
              >
                <Feather name="send" size={hp(4)} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
