import { Stack } from "expo-router";
import HomeHeader from "../../components/HomeHeader";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          header: () => <HomeHeader />,
        }}
      />
    </Stack>
  );
}
