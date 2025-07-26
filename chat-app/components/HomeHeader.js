import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Platform, Text, View } from "react-native";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../context/authContext";
import { blurhash } from "../uitls/common";
import { MenuItem } from "./CustomMenuItems";

const ios = Platform.OS === "ios";

export default function HomeHeader() {
  const { logout, user } = useAuth();
  const handleProfile = () => {};
  const handleSignout = async () => {
    await logout();
  };
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: ios ? top : top + 10 }}
      className="flex-row justify-between px-5 bg-blue-700 pb-5 rounded-lg shadow-xl"
    >
      <View>
        <Text style={{ fontSize: hp(3) }} className="font-medium text-white">
          Chat
        </Text>
      </View>
      <Menu>
        <MenuTrigger
          customStyles={{
            triggerWrapper: {},
          }}
        >
          <Image
            style={{ height: hp(4), aspectRatio: 1, borderRadius: 100 }}
            source="https://picsum.photos/seed/696/3000/2000"
            placeholder={blurhash}
            transition={500}
          />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              borderRadius: 10,
              borderCurve: "continuous",
              marginTop: 35,
              marginLeft: 0,
            },
          }}
        >
          <MenuItem
            text="Profile"
            action={handleProfile}
            value={null}
            icon={<Feather name="user" size={20} color="black" />}
          />
          <Divider />
          <MenuItem
            text="Sign Out"
            action={handleSignout}
            value={null}
            icon={<Feather name="log-out" size={20} color="black" />}
          />
        </MenuOptions>
      </Menu>
    </View>
  );
}

const Divider = () => {
  return <View className="p-[1px] w-full bg-neutral-300 h-[1px]"></View>;
};
