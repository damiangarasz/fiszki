import { OpcjeProp } from "@/app/types";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { onGoogleButtonPress } from "../../utilities/helpers/onGoogleButtonPress";
import EmailAuthForm from "./EmailAuthForm";

export default function Logowanie({ navigation }: OpcjeProp) {
  GoogleSignin.configure({
    webClientId: "493135918988-g9mf308tkbs9cdl0k2kevm7t3b34f5k5.apps.googleusercontent.com",
  });

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (user) navigation.navigate("Opcje Main");
  }, [user]);

  return (
    <View className="w-[100%] h-[100%] bg-bg">
      <View className="w-[75%] h-[80%] bg-bg-secondary m-auto rounded-md">
        <EmailAuthForm />
        <Pressable
          className="bg-bg-primary w-[75%] h-[7vh] m-auto"
          onPress={() => {
            onGoogleButtonPress();
          }}
        >
          <View className="m-auto flex-row">
            <Image
              className="my-auto"
              source={require("../../../../assets/images/android_light_google.png")}
              style={{ width: 45, height: 45 }}
            />
            <Text className="my-auto text-xl text-white">Google Sign In</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
