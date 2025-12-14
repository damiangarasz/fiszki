import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { FiszkiWyswietlanieProp, MojeFiszkiEkranMainProp } from "../types.ts";

export default function FiszkiWyswietlanie({ fiszki }: FiszkiWyswietlanieProp) {
  const Stack = createNativeStackNavigator();
  const [jakiZestawDoWyswietlenia, setJakiZestawDoWyswietlenia] = useState("");
  const [indexFiszek, setIndexFiszek] = useState(0);
  const [wybranaFiszka, setWybranaFiszka] = useState({ polski: "", angielski: "", kontekst: "" });

  //losowanie fiszka
  useEffect(() => {
    //proste losowanie fiszek bez wagi
    //TODO do rafabrykacji
    setWybranaFiszka(() => {
      const randomNumber = Math.floor(Math.random() * fiszki[indexFiszek].lista.length);
      return fiszki[indexFiszek].lista[randomNumber];
    });
  }, [indexFiszek]);

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
                    setIndexFiszek(index);
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
        <Text className="m-auto text-2xl">{jakiZestawDoWyswietlenia}</Text>
        <Pressable className="absolute right-10 top-5">
          <Image
            source={require("../../assets/images/opcje.png")}
            style={{ width: 45, height: 45 }}
          />
        </Pressable>
        <Pressable onPress={() => {}}>
          <View className="realtive m-auto w-[50vw] h-[60vh]">
            {/* TODO animacja jest spierdolona */}
            <View
              className={`absolute w-[100%] h-[100%] shadow-xl bg-lime-600 border  rounded-xl `}
            >
              <Text>{wybranaFiszka?.polski}</Text>
              <Text>{wybranaFiszka?.angielski}</Text>
              <Text>{wybranaFiszka?.kontekst}</Text>
            </View>
            <View className={`absolute w-[100%] h-[100%] shadow-xl bg-lime-500 border rounded-xl`}>
              <Text className="m-auto">{wybranaFiszka?.polski}</Text>
            </View>
          </View>
        </Pressable>
        <View className="flex flex-row">
          <Pressable className="w-[33vw] h-16  bg-green-600">
            <Text className="m-auto text-5xl">Znam</Text>
          </Pressable>
          <Pressable className="w-[33vw] h-16 bg-slate-300">
            <Text className="m-auto text-center text-2xl">Troche znam, a troche nie znam</Text>
          </Pressable>
          <Pressable className="w-[33vw] h-16 bg-red-700">
            <Text className="m-auto text-5xl">Nie znam</Text>
          </Pressable>
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
