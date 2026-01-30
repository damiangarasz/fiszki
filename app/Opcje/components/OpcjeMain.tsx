import { Image, Pressable, Text, View } from "react-native";

export default function OpcjeMain() {
  return (
    <View className="h-[100%] w-[100%] bg-bg flex gap-5 justify-evenly">
      <Pressable className="h-[7vh]">
        <View className="w-[80%] h-[100%] bg-[#eed0ae] bg-[radial-gradient(circle,_#eed0ae_0%,_#f5ea98_100%)] radious-sm mx-auto rounded-md shadow-xl">
          <Text className="font-card m-auto text-4xl">👑 Przejdź na PRO 👑</Text>
        </View>
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
          <Pressable className="w-[60%] h-[4vh] my-auto bg-bg-primary shadow-xl">
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
          <Pressable className="w-[80%] h-[60%] bg-bg shadow-[inset_4px_4px_10px_rgba(0,0,0,0.25)] rounded-md">
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
