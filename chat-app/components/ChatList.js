import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import ChatItem from "./ChatItem";

export default function ChatList({ users, currentUser }) {
  const router = useRouter();
  return (
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item) => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            item={item}
            currentUser={currentUser}
            router={router}
            index={index}
          />
        )}
      />
    </View>
  );
}
