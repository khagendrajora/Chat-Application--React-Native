import { ScrollView } from "react-native";
import MessageItem from "./MessageItem";

export default function MessageList({ messages, currentUser, scrollViewRef }) {
  return (
    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {messages.map((message, index) => {
        return (
          <MessageItem
            message={message}
            currentUser={currentUser}
            key={index}
          />
        );
      })}
    </ScrollView>
  );
}
