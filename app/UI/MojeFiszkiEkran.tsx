import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { FiszkiWyswietlanieProp, MojeFiszkiEkranMainProp } from "../types.ts";

export default function FiszkiWyswietlanie({ fiszki }: FiszkiWyswietlanieProp) {
  const Stack = createNativeStackNavigator();
  const [jakiZestawDoWyswietlenia, setJakiZestawDoWyswietlenia] = useState("");

  const dupa = fiszki;
  //losowanie fiszka
  useState(() => {
    console.log(fiszki.lista);
  });
  //TODO Tutaj jestem lol

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
                    setJakiZestawDoWyswietlenia(param.key);
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

  function WyswietlanieKart() {
    return (
      <View className="h-[100%] w-[100%] flex">
        <Text>{jakiZestawDoWyswietlenia}</Text>
        <View className="realtive m-auto w-[50vw] h-[60vh]">
          <View className="absolute w-[100%] h-[100%] shadow-xl bg-lime-600 border rounded-xl">
            <Text>Dupa</Text>
            <Text></Text>
          </View>
          <View className="absolute w-[100%] h-[100%] shadow-xl bg-lime-500 border rounded-xl">
            {" "}
            <Text className="m-auto">Dupa</Text>
          </View>
        </View>
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
