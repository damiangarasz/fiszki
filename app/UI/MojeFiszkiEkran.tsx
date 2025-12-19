import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { FiszkiWyswietlanieProp, MojeFiszkiEkranMainProp } from "../types.ts";

export default function FiszkiWyswietlanie({ fiszki }: FiszkiWyswietlanieProp) {
  const Stack = createNativeStackNavigator();
  const [jakiZestawDoWyswietlenia, setJakiZestawDoWyswietlenia] = useState("");
  const [indexFiszek, setIndexFiszek] = useState(0);
  const [wybranaFiszka, setWybranaFiszka] = useState({ polski: "", angielski: "", kontekst: "" });

  //rotowanie kart
  const rotation = useSharedValue(0);
  const [flipped, setFlipped] = useState(false);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 3000 }, { rotateY: `${rotation.value}deg` }],
    backgroundColor: "#84cc16", // lime-600
    borderWidth: 1,
    borderColor: "#4b5563", // gray-400
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // dla Androida
    width: "100%",
    height: "100%",
    position: "absolute",
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 3000 }, { rotateY: `${rotation.value - 90}deg` }],
    backgroundColor: "#84d382", // lime-500
    borderWidth: 1,
    borderColor: "#4b5563",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    height: "100%",
    position: "absolute",
  }));

  const onFlip = () => {
    setFlipped(!flipped);
    rotation.value = withTiming(flipped ? 0 : 90, {
      duration: 300,
    });
  };

  //KONIEC animowania kart

  //funkcja losująca z tabliczki uwzględniająca wagę, sumuje każdą wagę a później wybiera losując między 0 a suma wszystkich wag i wypycha pierwsze zadanie które jest większe od wylosowanej liczby
  useEffect(() => {
    //wybieranie fiszki na podstawie wagi:
    setWybranaFiszka(() => {
      let sum = 0;
      let accumulatedArray = [];

      for (let n of fiszki[indexFiszek].lista) {
        sum += n.waga;
        accumulatedArray.push(sum);
      }

      const index = Math.random() * sum;
      console.log(index);

      return fiszki[indexFiszek].lista[index];
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
        <Pressable onPress={onFlip}>
          <View className="realtive m-auto w-[50vw] h-[60vh]">
            <Animated.View
              style={[frontStyle]}
              className={`absolute w-[100%] h-[100%] shadow-xl bg-lime-600 border  rounded-xl `}
            >
              <Text>{wybranaFiszka?.polski}</Text>
              <Text>{wybranaFiszka?.angielski}</Text>
              <Text>{wybranaFiszka?.kontekst}</Text>
            </Animated.View>
            <Animated.View
              style={[backStyle]}
              className={`absolute w-[100%] h-[100%] shadow-xl bg-lime-500 border rounded-xl`}
            >
              <Text className="m-auto">{wybranaFiszka?.polski}</Text>
            </Animated.View>
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
