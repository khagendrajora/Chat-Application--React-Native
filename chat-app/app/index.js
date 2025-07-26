import { ActivityIndicator, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 justify-center item-center">
      <ActivityIndicator color="gray" size="large" />
    </View>
  );
}
