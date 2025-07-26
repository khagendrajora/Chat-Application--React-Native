import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const ios = Platform.OS == "ios";
export default function CustomKeyboardView({ children, inChat }) {
  let keyConfig = {};
  let scrollViewConfig = {};
  if (inChat) {
    keyConfig = { keyboardVerticalOffset: 90 };
    scrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      {...keyConfig}
      behavior={ios ? "padding" : "height"}
    >
      <ScrollView {...scrollViewConfig} style={{ flex: 1 }} bounces={false}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
