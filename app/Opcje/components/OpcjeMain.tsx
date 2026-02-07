import { OpcjeProp } from "@/app/types";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, Text, View } from "react-native";
import Konto from "./Konto/Konto";

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
      <Konto navigation={navigation} />
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
