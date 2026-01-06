import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFiszki } from "../context/FiszkiContext";
import { dodawanieStat } from "./utilities/dodawanieStat";

export default function WyswietlanieKart() {
  const {
    fiszki,
    indexFiszek,
    jakiZestawDoWyswietlenia,
    setSwitchTaFiszkaJuzByla,
    indexX,
    setFiszki,
    setOpcjeJezyk,
    back,
    front,
    wybranaFiszka,
    setIndexX,
    opcjeJezyj,
    setBack,
    setFront,
    setWybranaFiszka,
    ogolneStatystyki,
    setOgolneStatystyki,
    angielskiText,
  } = useFiszki();

  const [historia, setHistoria] = useState<string[]>([]);
  const [jeszczeRazLOL, setJeszczeRazLOL] = useState(false);

  //funkcja losująca z tabliczki uwzględniająca wagę, sumuje każdą wagę a później wybiera losując między 0 a suma wszystkich wag i wypycha pierwsze zadanie które jest większe od wylosowanej liczby
  function losowanieFiszki() {
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
      setJeszczeRazLOL((prev) => !prev);
    }
  }

  useEffect(() => {
    losowanieFiszki();
  }, [jeszczeRazLOL]);

  //Rotownaie kart
  const rotation = useSharedValue(0);
  const [flipped, setFlipped] = useState(false);
  const [opcjeToggle, setOpcjeToggle] = useState(false);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 3000 }, { rotateY: `${rotation.value - 90}deg` }],
    borderWidth: 0,
    borderRadius: 16,
    elevation: 5,
    width: "100%",
    height: "100%",
    position: "absolute",
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 3000 }, { rotateY: `${rotation.value}deg` }],
    borderWidth: 0,
    borderRadius: 16,
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

  function zmianaWagi(arg: string) {
    const fiszkiArrCopy = [...fiszki];
    if (fiszkiArrCopy.length == 0) return;
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
      <View className="flex-row bg-[#9b6b4651] m-auto absolute z-10 w-[100vw] top-16 h-[15vh] justify-evenly">
        <Pressable
          className="w-[30%] border-2 rounded-full shadow-xl h-16 m-auto bg-[#9b6b46]"
          onPress={() => {
            setOpcjeJezyk("PL");
            setOpcjeToggle((prev) => !prev);
          }}
        >
          <Text className="text-center m-auto font-SourGummy">Polski</Text>
        </Pressable>
        <Pressable
          className="w-[30%] border-2 rounded-full shadow-xl h-16 m-auto bg-[#9b6b46]"
          onPress={() => {
            setOpcjeJezyk("EN");
            setOpcjeToggle((prev) => !prev);
          }}
        >
          <Text className="text-center m-auto font-SourGummy">Angielski</Text>
        </Pressable>
        <Pressable
          className="w-[30%] border-2 rounded-full shadow-xl h-16 m-auto bg-[#9b6b46]"
          onPress={() => {
            setOpcjeJezyk("PL/EN");
            setOpcjeToggle((prev) => !prev);
          }}
        >
          <Text className="text-center m-auto font-SourGummy">Polsko/Angielski</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View className="h-[100vh] w-[100%] flex relative bg-[#faf4e8]">
        <Text className="absolute m-auto text-2xl color-[#9b6b46] font-SourGummy h-[5vh] top-16">
          {jakiZestawDoWyswietlenia}
        </Text>
        <Pressable
          className="absolute right-10 top-[8vh] z-10"
          onPress={() => {
            setOpcjeToggle((prev) => !prev);
          }}
        >
          <Image
            source={require("../../assets/images/opcje-bronze.png")}
            style={{ width: 45, height: 45 }}
          />
        </Pressable>
        {opcjeToggle ? OpcjeFiszki() : <></>}

        <View className="h-[100vh]">
          <Pressable onPress={onFlip} className="mx-auto mt-40">
            <View className="realtive m-auto w-[90vw] h-[50vh]">
              <Animated.View
                style={[backStyle]}
                className={`absolute w-[100%] h-[100%] shadow-xl border rounded-xl`}
              >
                <LinearGradient
                  colors={["#cdebc7", "#fdedb2"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    flex: 1,
                    borderRadius: 16,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 20,
                  }}
                >
                  <Text className="text-center m-auto font-SourGummy text-6xl color-[#9b6b46]">
                    {back}
                  </Text>
                </LinearGradient>
              </Animated.View>
              <Animated.View
                style={[frontStyle]}
                className={`absolute w-[100%] h-[100%] shadow-xl border rounded-xl`}
              >
                <LinearGradient
                  colors={["#b6d1b0", "#fddfb2"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    flex: 1,
                    borderRadius: 16,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 20,
                  }}
                >
                  <View className="h-[33%]"></View>
                  <View className="h-[33%] m-auto w-[90%]">
                    <Text className="text-center m-auto text-6xl font-SourGummy color-[#9b6b46]">
                      {front}
                    </Text>
                  </View>
                  <View className="h-[33%]">
                    <Text className="m-auto text-center text-2xl color-[#9b6b46]">
                      {wybranaFiszka?.kontekst}
                    </Text>
                  </View>
                </LinearGradient>
              </Animated.View>
            </View>
          </Pressable>
        </View>
        <View className="absolute bottom-40 flex flex-row h-[56px] w-[100%] justify-evenly">
          <Pressable
            className="w-[30vw] h-16  bg-[#e1eed4] border-2 border-[#53985d] rounded-full shadow-xl"
            onPress={() => {
              dodawanieStat({ setOgolneStatystyki, angielskiText, num: 2 });
              losowanieFiszki();
              zmianaWagi("znam");
              if (flipped) {
                rotation.value = 0;
                setFlipped(!flipped);
              }
            }}
          >
            <Text className="m-auto text-3xl color-[#53985d]">Znam</Text>
          </Pressable>
          <Pressable
            className="w-[30vw] h-16 bg-[#d7e8f8] border-2 border-[#71a5d7] rounded-full shadow-xl"
            onPress={() => {
              dodawanieStat({ setOgolneStatystyki, angielskiText, num: 1 });
              losowanieFiszki();
              zmianaWagi("troche");
              if (flipped) {
                rotation.value = 0;
                setFlipped(!flipped);
              }
            }}
          >
            <Text className="m-auto text-center text-1xl color-[#71a5d7] ">
              Troche znam, a troche nie znam
            </Text>
          </Pressable>
          <Pressable
            className="w-[30vw] h-16 bg-[#f9d5d5] border-2 border-[#a82b2d] rounded-full shadow-xl"
            onPress={() => {
              dodawanieStat({ setOgolneStatystyki, angielskiText, num: 0 });
              losowanieFiszki();
              zmianaWagi("nieZnam");
              if (flipped) {
                rotation.value = 0;
                setFlipped(!flipped);
              }
            }}
          >
            <Text className="m-auto text-3xl color-[#a82b2d]">Nie znam</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
