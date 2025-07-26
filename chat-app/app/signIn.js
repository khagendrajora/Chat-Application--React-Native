import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import CustomKeyboardView from "../components/CustomKeybordView";
import Loading from "../components/Loading";
import { useAuth } from "../context/authContext";

export default function SignIn() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Please fill the empty fields");
      return;
    }
    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    if (!response.success) {
      Alert.alert("Sign In", response.msg);
    }
  };
  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View
        style={{ padding: hp(8), paddingHorizontal: widthPercentageToDP(5) }}
        className="flex-1 gap-12"
      >
        <View className="items-center">
          <Image
            style={{ height: hp(25) }}
            resizeMode="contain"
            source={require("../assets/images/chat.jpg")}
          />
        </View>
        <View className="gap-5">
          <Text style={{ fontSize: hp(5) }} className="font-bold text-center">
            Sign In
          </Text>
          <View
            style={{ height: hp(7) }}
            className="flex-row gap-4 items-center bg-neutral-100 p-4 rounded-lg"
          >
            <Octicons name="mail" size={24} color="gray" />
            <TextInput
              onChangeText={(value) => (emailRef.current = value)}
              style={{ height: hp(5) }}
              className="flex-1 font-semibold outline-none text-black"
              placeholder="Email"
              placeholderTextColor={"black"}
            />
          </View>
          <View className="gap-3">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 items-center bg-neutral-100 p-4 rounded-lg"
            >
              <Octicons name="lock" size={24} color="gray" />
              <TextInput
                onChangeText={(value) => (passwordRef.current = value)}
                style={{ height: hp(5) }}
                className="flex-1 font-semibold outline-none text-neutral-700"
                placeholder="Password"
                secureTextEntry
                placeholderTextColor={"black"}
              />
            </View>
            <Text
              style={{ fontSize: hp(1.8) }}
              className="font-bold text-gray-500 text-end"
            >
              Forgot password?
            </Text>
          </View>
          <View>
            {loading ? (
              <View className="flex-row justify-center ">
                <Loading size={hp(5)} />
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleLogin}
                className="bg-blue-700 rounded-lg p-3"
              >
                <Text
                  style={{ fontSize: hp(2.7) }}
                  className="text-white text-center font-semibold"
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="flex-row  gap-3 justify-center">
            <Text style={{ fontSize: hp(2) }}>Don`t have an account?</Text>
            <Pressable onPress={() => router.push("signUp")}>
              <Text
                style={{ fontSize: hp(2) }}
                className="font-semibold text-blue-800"
              >
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
