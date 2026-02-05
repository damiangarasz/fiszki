import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Pressable, Text, View } from "react-native";
import { onGoogleButtonPress } from "../../utilities/helpers/onGoogleButtonPress";

export default function Logowanie() {
  GoogleSignin.configure({
    webClientId: "493135918988-721bkccbcoitr5jtpa72ejrb0jri5mhu.apps.googleusercontent.com",
  });

  return (
    <View className="w-[100%] h-[100%] bg-bg">
      <View className="w-[75%] h-[80%] bg-bg-secondary m-auto rounded-md">
        <Pressable
          onPress={() => {
            onGoogleButtonPress();
          }}
        >
          <Text>Google Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
}
