import { GoogleAuthProvider, getAuth, signInWithCredential } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Pressable, Text, View } from "react-native";

export default function Logowanie() {
  GoogleSignin.configure({
    webClientId: "493135918988-721bkccbcoitr5jtpa72ejrb0jri5mhu.apps.googleusercontent.com",
  });

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();

    // Try the new style of google-sign in result, from v13+ of that module
    const idToken = signInResult.data?.idToken;

    if (!idToken) {
      throw new Error("No ID token found");
    }

    // Create a Google credential with the token
    const googleCredential = GoogleAuthProvider.credential(signInResult.data?.idToken);

    // Sign-in the user with the credential
    return signInWithCredential(getAuth(), googleCredential);
  }
  return (
    <View className="w-[100%] h-[100%] bg-bg">
      <View className="w-[75%] h-[80%] bg-bg-secondary m-auto rounded-md">
        <Pressable
          onPress={() => {
            onGoogleButtonPress();
          }}
        >
          <Text>Google Sign In</Text>{" "}
        </Pressable>
      </View>
    </View>
  );
}
