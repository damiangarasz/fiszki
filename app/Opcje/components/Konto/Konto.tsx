import { OpcjeProp } from "@/app/types";
import { FirebaseAuthTypes, getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { handleLogOut } from "../../utilities/helpers/handleLogOut";

export default function Konto({ navigation }: OpcjeProp) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  function handleAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null;
  return (
    <View className="w-[80%] h-[25vh] bg-bg-secondary rounded-md mx-auto shadow-xl flex-row p-4 gap-4">
      <View className="flex-[3]">
        <View>
          <Text className="font-primary text-text-primary text-xl">Konto</Text>
          <View className="flex-row">
            <Text className="font-primary text-text-primary">Status: </Text>
            {user ? (
              <View>
                <Text className="font-primary text-text-primary">Zalogowany</Text>
                <Text>{user?.email}</Text>
              </View>
            ) : (
              <Text className="font-primary text-text-primary">Niezalogowany</Text>
            )}
          </View>
        </View>
        {user ? (
          <Pressable
            className="w-[60%] h-[4vh] my-auto bg-bg-primary shadow-xl"
            onPress={() => {
              handleLogOut();
            }}
          >
            <Text className="font-primary text-white rounded-md text-center m-auto">Wyloguj</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              navigation.navigate("Logowanie");
            }}
            className="w-[60%] h-[4vh] my-auto bg-bg-primary shadow-xl"
          >
            <Text className="font-primary text-white rounded-md text-center m-auto">Zaloguj</Text>
          </Pressable>
        )}
      </View>
      <View className="flex-[2] justify-between">
        <View className="flex-row gap-1">
          <View>
            <Image
              className="m-auto"
              source={require("../../../../assets/images/cloud-connected-brown.png")}
              style={{ width: 35, height: 35 }}
            />
          </View>
          <View>
            <Text className="font-primary text-text-primary">Ostatnia synchronizacja:</Text>
            <Text className="font-primary text-text-primary">2 min temu</Text>
          </View>
        </View>
        <Pressable
          className="w-[80%] h-[60%] bg-bg border-t-4 border-l-4 border-t-black/10 border-l-black/10 
             border-b-0 border-r-0 rounded-md"
        >
          <View className="m-auto">
            <Image
              className="m-auto"
              source={require("../../../../assets/images/share-brown.png")}
              style={{ width: 45, height: 45 }}
            />
            <Text className="m-auto font-primary text-text-primary text-xl">Eksport</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
