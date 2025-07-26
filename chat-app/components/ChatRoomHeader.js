import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function ChatRoomHeader({ user, router }) {
  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: true,

        headerLeft: () => (
          <View className="flex-row item-center  gap-3">
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo name="chevron-left" size={hp(4)} color="black" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-3">
              <Image
                source={user?.profileUrl}
                style={{ height: hp(4), aspectRatio: 1, borderRadius: 100 }}
              />
              <Text
                style={{ fontSize: hp(2.5) }}
                className="text-neutral-700 font-medium"
              >
                {user?.username}
              </Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <View className="flex-row items-center  gap-3">
            <Ionicons name="call-sharp" size={hp(2.8)} color="#737373" />
            <FontAwesome name="video-camera" size={hp(2.8)} color="#737373" />
          </View>
        ),
      }}
    />
  );
}
