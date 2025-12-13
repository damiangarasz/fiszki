import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";
import { FiszkiWyswietlanieProp, MojeFiszkiEkranMainProp } from "../types.ts";
import WyswietlanieKart from "./WyswietlanieKart.tsx";

export default function FiszkiWyswietlanie({ fiszki }: FiszkiWyswietlanieProp) {
  const Stack = createNativeStackNavigator();

  function MojeFiszkiEkranMain({ navigation }: MojeFiszkiEkranMainProp) {
    return (
      <View className="w-[75%] h-[75%] m-auto shadow-2xl">
        {fiszki.length == 0 ? (
          <View>
            <Text className="text-center text-4xl">
              Brak fiszek! Dodaj pierwszą w &#34;Edycja&#34;
            </Text>
          </View>
        ) : (
          fiszki.map((param, index) => {
            return (
              <View key={index} className="border-b border-gray-400 border-dotted">
                <Pressable
                  onPress={() => {
                    navigation.navigate("wyswietlanie");
                  }}
                >
                  <Text className="w-[50%] text-center m-auto text-2xl">{param.key}</Text>
                </Pressable>
              </View>
            );
          })
        )}
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{}} initialRouteName="main">
      <Stack.Screen name="main" component={MojeFiszkiEkranMain} />
      <Stack.Screen name="wyswietlanie" component={WyswietlanieKart} />
    </Stack.Navigator>
  );
}
