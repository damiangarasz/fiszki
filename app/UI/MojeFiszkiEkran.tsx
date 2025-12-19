import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
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
    transform: [{ perspective: 3000 }, { rotateY: `${rotation.value}deg` }],
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
    console.log(konFlip);

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
      console.log("halo");
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
          console.log("waga:", prevArr[indexFiszek].lista[indexX].waga);
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
          console.log("waga:", prevArr[indexFiszek].lista[indexX].waga);
          return prevArr;
        });
      } else if (fiszkiArrCopy[indexFiszek].lista[indexX].waga <= 0.1) {
        console.log(fiszki[indexFiszek].lista[indexX].waga);
      }
    } else if (arg == "nieZnam") {
      if (fiszkiArrCopy[indexFiszek].lista[indexX].waga < 1.5) {
        setFiszki((prev) => {
          const prevArr = [...prev];
          prevArr[indexFiszek].lista[indexX].waga =
            Math.round((prevArr[indexFiszek].lista[indexX].waga + 0.5) * 100) / 100;
          console.log("waga:", prevArr[indexFiszek].lista[indexX].waga);
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
          console.log("waga:", prevArr[indexFiszek].lista[indexX].waga);
          return prevArr;
        });
      } else if (fiszkiArrCopy[indexFiszek].lista[indexX].waga >= 1.9) {
        console.log(fiszki[indexFiszek].lista[indexX].waga);
      }
    } else {
      setFiszki((prev) => {
        const prevArr = [...prev];
        prevArr[indexFiszek].lista[indexX].waga = 1;
        console.log("waga:", prevArr[indexFiszek].lista[indexX].waga);
        return prevArr;
      });
    }
  }

  function OpcjeFiszki() {
    return (
      <View>
        <Pressable
          onPress={() => {
            setOpcjeJezyk("PL");
            setOpcjeToggle((prev) => !prev);
          }}
        >
          <Text>Polski</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setOpcjeJezyk("EN");
            setOpcjeToggle((prev) => !prev);
          }}
        >
          <Text>Angielski</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setOpcjeJezyk("PL/EN");
            setOpcjeToggle((prev) => !prev);
          }}
        >
          <Text>Polsko/Angielski</Text>
        </Pressable>
      </View>
    );
  }

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
        <Pressable
          className="absolute right-10 top-5"
          onPress={() => {
            setOpcjeToggle((prev) => !prev);
          }}
        >
          <Image
            source={require("../../assets/images/opcje.png")}
            style={{ width: 45, height: 45 }}
          />
        </Pressable>
        <View>{opcjeToggle ? OpcjeFiszki() : <></>}</View>
        <Pressable onPress={onFlip}>
          <View className="realtive m-auto w-[50vw] h-[60vh]">
            <Animated.View
              style={[backStyle]}
              className={`absolute w-[100%] h-[100%] shadow-xl bg-lime-600 border  rounded-xl `}
            >
              <Text>{back}</Text>
              <Text>{wybranaFiszka?.kontekst}</Text>
            </Animated.View>
            <Animated.View
              style={[frontStyle]}
              className={`absolute w-[100%] h-[100%] shadow-xl bg-lime-500 border rounded-xl`}
            >
              <Text>{front}</Text>
            </Animated.View>
          </View>
        </Pressable>
        <View className="flex flex-row">
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
            <Text className="m-auto text-5xl">Znam</Text>
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
            <Text className="m-auto text-center text-2xl">Troche znam, a troche nie znam</Text>
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
