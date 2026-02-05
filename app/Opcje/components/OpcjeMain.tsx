import { OpcjeProp } from "@/app/types";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, Text, View } from "react-native";

export default function OpcjeMain({ navigation }: OpcjeProp) {
  return (
    <View className="h-[100%] w-[100%] bg-bg flex gap-5 justify-evenly">
      <Pressable className="h-[8vh] w-[80%] mx-auto shadow-xl rounded-md overflow-hidden">
        <LinearGradient
          colors={["#eed0ae", "#f5ea98", "#eed0ae"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}
        >
          <Text className="font-card text-4xl text-center">👑 Przejdź na PRO 👑</Text>
        </LinearGradient>
      </Pressable>
      <View className="w-[80%] h-[25vh] bg-bg-secondary rounded-md mx-auto shadow-xl flex-row p-4 gap-4">
        <View className="flex-[3]">
          <View>
            <Text className="font-primary text-text-primary text-xl">Konto</Text>
            <View className="flex-row">
              <Text className="font-primary text-text-primary">Status: </Text>
              <Text className="font-primary text-text-primary">Niezalogowany</Text>
            </View>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate("Logowanie");
            }}
            className="w-[60%] h-[4vh] my-auto bg-bg-primary shadow-xl"
          >
            <Text className="font-primary text-white rounded-md text-center m-auto">Zaloguj</Text>
          </Pressable>
        </View>
        <View className="flex-[2] justify-between">
          <View className="flex-row gap-1">
            <View>
              <Image
                className="m-auto"
                source={require("../../../assets/images/cloud-connected-brown.png")}
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
                source={require("../../../assets/images/share-brown.png")}
                style={{ width: 45, height: 45 }}
              />
              <Text className="m-auto font-primary text-text-primary text-xl">Eksport</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <Pressable className="w-[80%] h-[7vh] bg-bg rounded-md mx-auto shadow-xl flex-row">
        <Image
          className=""
          source={require("../../../assets/images/theme-brown.png")}
          style={{ width: 25, height: 25 }}
        />
        <Text className="text-text-primary font-primary">Zmień motyw</Text>
        <Text className="text-text-primary font-primary">Obecny: </Text>
        <Text className="text-text-primary font-primary">Default</Text>
      </Pressable>
    </View>
  );
}
