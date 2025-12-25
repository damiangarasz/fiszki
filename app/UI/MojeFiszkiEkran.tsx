import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { FiszkiWyswietlanieProp, MojeFiszkiEkranMainProp } from "../types.ts";

export default function FiszkiWyswietlanie({ fiszki, setFiszki }: FiszkiWyswietlanieProp) {
  const Stack = createNativeStackNavigator();
  const [jakiZestawDoWyswietlenia, setJakiZestawDoWyswietlenia] = useState("");
  const [indexFiszek, setIndexFiszek] = useState(0);
  const [wybranaFiszka, setWybranaFiszka] = useState({ polski: "", angielski: "", kontekst: "" });
  const [historia, setHistoria] = useState<string[]>([]);
  const [switchTaFiszkaJuzByla, setSwitchTaFiszkaJuzByla] = useState(false);
  const [opcjeToggle, setOpcjeToggle] = useState(false);
  const [opcjeJezyj, setOpcjeJezyk] = useState("PL/EN");
  const [back, setBack] = useState("");
  const [front, setFront] = useState("");
  const [indexX, setIndexX] = useState(0);

  //rotowanie kart
  const rotation = useSharedValue(0);
  const [flipped, setFlipped] = useState(false);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 3000 }, { rotateY: `${rotation.value - 90}deg` }],
    backgroundColor: "#84cc16", // lime-600
    borderWidth: 0,
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
    transform: [{ perspective: 3000 }, { rotateY: `${rotation.value}deg` }],
    backgroundColor: "#84d382", // lime-500
    borderWidth: 0,
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
    rotation.value = withTiming(flipped ? 0 : 90, {
      duration: 300,
    });
    setFlipped(!flipped);
  };

  //KONIEC animowania kart

  //funkcja losująca z tabliczki uwzględniająca wagę, sumuje każdą wagę a później wybiera losując między 0 a suma wszystkich wag i wypycha pierwsze zadanie które jest większe od wylosowanej liczby
  useEffect(() => {
    //wybieranie fiszki na podstawie wagi:
    if (fiszki[indexFiszek] == undefined) return;
    let sum = 0;
    let accumulatedArray = [];

    for (let n of fiszki[indexFiszek].lista) {
      sum += n.waga;
      accumulatedArray.push(sum);
    }

    const rand = Math.random() * sum;
    const index = accumulatedArray.findIndex((value) => rand < value);

    //sprawdzanie historii
    if (fiszki[indexFiszek].lista.length <= 5) {
      //jeżeli fiszek jest mniej niż 5 zwracaj wylosowaną fiszkę
      setIndexX(index);
      setWybranaFiszka(fiszki[indexFiszek].lista[index]);
    } else if (historia.includes(fiszki[indexFiszek].lista[index].polski)) {
      //fiszka sie powtarza losowanie nowej fiszki:
      setSwitchTaFiszkaJuzByla((prev) => !prev);
      return;
    } else {
      //fiszki nie ma w historii:
      //puszowanie wyboru do historii
      setHistoria((prev) => {
        const noMutable = [...prev];
        if (noMutable.length >= 5) {
          noMutable.shift();
        }

        const never = fiszki[indexFiszek].lista[index].polski;
        noMutable.push(never);

        return noMutable;
      });
      setIndexX(index);
      setWybranaFiszka(fiszki[indexFiszek].lista[index]);
    }

    const konFlip = Math.floor(Math.random() * 2);

    if (opcjeJezyj == "PL") {
      setFront(() => {
        return wybranaFiszka?.angielski;
      });
      setBack(() => {
        return wybranaFiszka?.polski;
      });
    } else if (opcjeJezyj == "EN") {
      setBack(() => {
        return wybranaFiszka?.angielski;
      });
      setFront(() => {
        return wybranaFiszka?.polski;
      });
    } else {
      if (konFlip == 0) {
        setFront(() => {
          return wybranaFiszka?.angielski;
        });
        setBack(() => {
          return wybranaFiszka?.polski;
        });
      } else {
        setBack(() => {
          return wybranaFiszka?.angielski;
        });
        setFront(() => {
          return wybranaFiszka?.polski;
        });
      }
    }
    if (wybranaFiszka?.polski == "") {
      setSwitchTaFiszkaJuzByla((prev) => !prev);
    }
  }, [indexFiszek, switchTaFiszkaJuzByla]);

  //wiem że nie DRY ale trudno, nikt mi medalu za DRY nie da
  //TODO do refaktoryzacji
  function zmianaWagi(arg: string) {
    const fiszkiArrCopy = [...fiszki];
    if (arg == "znam") {
      if (fiszkiArrCopy[indexFiszek].lista[indexX].waga > 0.5) {
        setFiszki((prev) => {
          const prevArr = [...prev];
          prevArr[indexFiszek].lista[indexX].waga =
            Math.round((prevArr[indexFiszek].lista[indexX].waga - 0.5) * 100) / 100;
          return prevArr;
        });
      } else if (
        fiszkiArrCopy[indexFiszek].lista[indexX].waga <= 0.5 &&
        fiszkiArrCopy[indexFiszek].lista[indexX].waga > 0.1
      ) {
        setFiszki((prev) => {
          const prevArr = [...prev];
          prevArr[indexFiszek].lista[indexX].waga =
            Math.round((prevArr[indexFiszek].lista[indexX].waga - 0.1) * 100) / 100;
          return prevArr;
        });
      } else if (fiszkiArrCopy[indexFiszek].lista[indexX].waga <= 0.1) {
      }
    } else if (arg == "nieZnam") {
      if (fiszkiArrCopy[indexFiszek].lista[indexX].waga < 1.5) {
        setFiszki((prev) => {
          const prevArr = [...prev];
          prevArr[indexFiszek].lista[indexX].waga =
            Math.round((prevArr[indexFiszek].lista[indexX].waga + 0.5) * 100) / 100;
          return prevArr;
        });
      } else if (
        fiszkiArrCopy[indexFiszek].lista[indexX].waga >= 1.5 &&
        fiszkiArrCopy[indexFiszek].lista[indexX].waga < 1.9
      ) {
        setFiszki((prev) => {
          const prevArr = [...prev];
          prevArr[indexFiszek].lista[indexX].waga =
            Math.round((prevArr[indexFiszek].lista[indexX].waga + 0.1) * 100) / 100;
          return prevArr;
        });
      } else if (fiszkiArrCopy[indexFiszek].lista[indexX].waga >= 1.9) {
      }
    } else {
      setFiszki((prev) => {
        const prevArr = [...prev];
        prevArr[indexFiszek].lista[indexX].waga = 1;

        return prevArr;
      });
    }
  }

  function OpcjeFiszki() {
    return (
      <View className="flex-row bg-teal-600/90 m-auto absolute z-10 w-[100vw] top-24 h-[15vh]">
        <Pressable
          className="w-[33%]"
          onPress={() => {
            setOpcjeJezyk("PL");
            setOpcjeToggle((prev) => !prev);
          }}
        >
          <Text className="text-center m-auto">Polski</Text>
        </Pressable>
        <Pressable
          className="w-[33%]"
          onPress={() => {
            setOpcjeJezyk("EN");
            setOpcjeToggle((prev) => !prev);
          }}
        >
          <Text className="text-center m-auto">Angielski</Text>
        </Pressable>
        <Pressable
          className="w-[33%]"
          onPress={() => {
            setOpcjeJezyk("PL/EN");
            setOpcjeToggle((prev) => !prev);
          }}
        >
          <Text className="text-center m-auto">Polsko/Angielski</Text>
        </Pressable>
      </View>
    );
  }

  function MojeFiszkiEkranMain({ navigation }: MojeFiszkiEkranMainProp) {
    return (
      <View className="bg-white w-[75%] h-[75%] m-auto shadow-2xl">
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
                    if (fiszki[index].lista.length > 0) {
                      setJakiZestawDoWyswietlenia(param.key);
                      setIndexFiszek(index);
                      navigation.navigate("wyswietlanie");
                    }
                  }}
                >
                  <Text className="w-[50%] text-center m-auto text-2xl">{param.key}</Text>
                  <Text>Ilość fiszek: {fiszki[index].lista.length}</Text>
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
      <SafeAreaView>
        <View className="h-[100vh] w-[100%] flex relative">
          <Text className="m-auto text-2xl h-[5vh]">{jakiZestawDoWyswietlenia}</Text>
          <Pressable
            className="absolute right-10 top-[5vh] z-10"
            onPress={() => {
              setOpcjeToggle((prev) => !prev);
            }}
          >
            <Image
              source={require("../../assets/images/opcje.png")}
              style={{ width: 45, height: 45 }}
            />
          </Pressable>
          {opcjeToggle ? OpcjeFiszki() : <></>}

          <View className="h-[67vh]">
            <Pressable onPress={onFlip} className="m-auto">
              <View className="realtive m-auto w-[90vw] h-[50vh]">
                <Animated.View
                  style={[backStyle]}
                  className={`absolute w-[100%] h-[100%] shadow-xl bg-lime-600 border  rounded-xl `}
                >
                  <Text className="text-center m-auto text-6xl">{back}</Text>
                </Animated.View>
                <Animated.View
                  style={[frontStyle]}
                  className={`absolute w-[100%] h-[100%] shadow-xl bg-lime-500 border rounded-xl`}
                >
                  <View className="h-[33%]"></View>
                  <View className="h-[33%] m-auto w-[90%]">
                    <Text className="text-center m-auto text-6xl">{front}</Text>
                  </View>
                  <View className="h-[33%]">
                    <Text className="m-auto text-center text-2xl">{wybranaFiszka?.kontekst}</Text>
                  </View>
                </Animated.View>
              </View>
            </Pressable>
          </View>
          <View className="flex flex-row h-[28vh]">
            <Pressable
              className="w-[33vw] h-16  bg-green-600"
              onPress={() => {
                setSwitchTaFiszkaJuzByla((prev) => !prev);
                zmianaWagi("znam");
                if (flipped) {
                  rotation.value = 0;
                  setFlipped(!flipped);
                }
              }}
            >
              <Text className="m-auto text-3xl">Znam</Text>
            </Pressable>
            <Pressable
              className="w-[33vw] h-16 bg-slate-300"
              onPress={() => {
                setSwitchTaFiszkaJuzByla((prev) => !prev);
                zmianaWagi("troche");
                if (flipped) {
                  rotation.value = 0;
                  setFlipped(!flipped);
                }
              }}
            >
              <Text className="m-auto text-center text-1xl">Troche znam, a troche nie znam</Text>
            </Pressable>
            <Pressable
              className="w-[33vw] h-16 bg-red-700"
              onPress={() => {
                setSwitchTaFiszkaJuzByla((prev) => !prev);
                zmianaWagi("nieZnam");
                if (flipped) {
                  rotation.value = 0;
                  setFlipped(!flipped);
                }
              }}
            >
              <Text className="m-auto text-3xl">Nie znam</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  //TODO te komponenty do osobnych plików refaktor i dodać odpowiedni prop
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName="Moje Fiszki">
      <Stack.Screen name="Moje Fiszki" component={MojeFiszkiEkranMain} />
      <Stack.Screen
        name="wyswietlanie"
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: "black",
        }}
        component={WyswietlanieKart}
      />
    </Stack.Navigator>
  );
}
