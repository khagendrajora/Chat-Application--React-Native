import { Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function MessageItem({ message, currentUser }) {
  if (currentUser?.userId === message?.userId) {
    return (
      <View className="flex-row justify-end mb-3 mr-3">
        <View style={{ width: wp(80) }}>
          <View className="flex self-end p-3 rounded-2xl bg-white border ">
            <Text style={{ fontSize: hp(2) }}>{message.text}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ width: wp(80) }} className="ml-3 mb-3">
        <View className="flex self-start p-3 rounded-2xl bg-indigo-200 border ">
          <Text style={{ fontSize: hp(2) }}>{message?.text}</Text>
        </View>
      </View>
    );
  }
}
