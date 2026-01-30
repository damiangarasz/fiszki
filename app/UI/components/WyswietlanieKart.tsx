import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFiszki } from "../../context/FiszkiContext.tsx";
import losowanieIndexuFiszki from "../utilities/helpers/losowanieIndexuFiszki.tsx";
import sprawdzanieHistoriiFiszek from "../utilities/helpers/sprawdzanieHistoriiFiszek.tsx";
import { dodawanieStat } from "../utilities/logic/dodawanieStat.tsx";
import wybranieFiszkiNaPodstawieHistorii from "../utilities/logic/wybranieFiszkiNaPodstawieHistorii.tsx";
import { wypelnianieKartSlowami } from "../utilities/logic/wypelnianieKartSlowami.tsx";
import zmianaWagi from "../utilities/logic/zmianaWagi.tsx";
import zamianaZnamNieZnam from "../utilities/logic/zmianaZnamNieZnam.tsx";
import { ObjType } from "../utilities/utilitiesTypes.ts";

const pobierzDate = (): ObjType => {
  const date = new Date();
  return {
    day: date.getDay(),
    data: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    pelnaData: [date.getDate(), date.getMonth(), date.getFullYear()],
  };
};

export default function WyswietlanieKart() {
  const {
    fiszki,
    indexFiszek,
    jakiZestawDoWyswietlenia,
    setSwitchTaFiszkaJuzByla,
    switchTaFiszkaJuzByla,
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
    setOgolneStatystyki,
    angielskiText,
  } = useFiszki();

  const [historia, setHistoria] = useState<string[]>([]);
  const [triggerReload, setTriggerReload] = useState(false);

  useEffect(() => {
    const randomNum = Math.random();
    wypelnianieKartSlowami({
      randomNum,
      opcjeJezyj,
      setFront,
      setBack,
      wybranaFiszka,
      setTriggerReload,
    });
  }, [wybranaFiszka]);

  useEffect(() => {
    const randomNum = Math.random();
    const index = losowanieIndexuFiszki({ fiszki, indexFiszek, randomNum });

    //sprawdzenia historii
    const sprHistorii = sprawdzanieHistoriiFiszek({ historia, fiszki, indexFiszek, index });

    //ustawia settery setIndexX setWybranaFiszka setSwitchTaFiszkaJuzByla setHistoria
    wybranieFiszkiNaPodstawieHistorii({
      fiszki,
      indexFiszek,
      setIndexX,
      setWybranaFiszka,
      setHistoria,
      setSwitchTaFiszkaJuzByla,
      sprHistorii,
      index,
    });
  }, [triggerReload, switchTaFiszkaJuzByla]);

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

  const [dataObj, setDataObj] = useState<ObjType>(pobierzDate);

  function OpcjeFiszki() {
    return (
      <View className="flex-row bg-bg-lang m-auto absolute z-10 w-[100vw] top-16 h-[15vh] justify-evenly">
        <Pressable
          className="w-[30%] border-2 rounded-full shadow-xl h-16 m-auto bg-btn-lang border-border-lang"
          onPress={() => {
            setOpcjeJezyk("PL");
            setOpcjeToggle((prev) => !prev);
          }}
        >
          <Text className="text-center m-auto font-buttons">Polski</Text>
        </Pressable>
        <Pressable
          className="w-[30%] border-2 rounded-full shadow-xl h-16 m-auto bg-btn-lang border-border-lang"
          onPress={() => {
            setOpcjeJezyk("EN");
            setOpcjeToggle((prev) => !prev);
          }}
        >
          <Text className="text-center m-auto font-buttons">Angielski</Text>
        </Pressable>
        <Pressable
          className="w-[30%] border-2 rounded-full shadow-xl h-16 m-auto bg-btn-lang border-border-lang"
          onPress={() => {
            setOpcjeJezyk("PL/EN");
            setOpcjeToggle((prev) => !prev);
          }}
        >
          <Text className="text-center m-auto font-buttons">Polsko/Angielski</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View className="h-[100vh] w-[100%] flex relative bg-bg">
        <Text className="absolute m-auto text-2xl color-text-primary font-primary h-[5vh] top-[8vh]">
          {jakiZestawDoWyswietlenia}
        </Text>
        <Pressable
          className="absolute right-10 top-[8vh] z-10"
          onPress={() => {
            setOpcjeToggle((prev) => !prev);
          }}
        >
          <Image
            source={require("../../../assets/images/opcje-bronze.png")}
            style={{ width: 45, height: 45 }}
          />
        </Pressable>
        {opcjeToggle ? OpcjeFiszki() : <></>}

        <View className="h-[100vh]">
          <Pressable onPress={onFlip} className="mx-auto mt-40">
            <View className="realtive m-auto w-[90vw] h-[50vh]">
              <Animated.View
                style={[backStyle]}
                className={`absolute w-[100%] h-[100%] border rounded-xl`}
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
                  <Text className="text-center m-auto font-card text-6xl color-text-card">
                    {back}
                  </Text>
                </LinearGradient>
              </Animated.View>
              <Animated.View
                style={[frontStyle]}
                className={`absolute w-[100%] h-[100%] border rounded-xl`}
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
                    <Text className="text-center m-auto text-6xl font-card color-text-card">
                      {front}
                    </Text>
                  </View>
                  <View className="h-[33%]">
                    <Text className="m-auto text-center text-2xl color-[#9b6b46] font-card">
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
            className="w-[30vw] h-16  bg-btn-know border-2 border-border-know rounded-full shadow-xl"
            onPress={() => {
              zamianaZnamNieZnam({ param: 2, setFiszki, fiszki, indexFiszek, indexX });
              dodawanieStat({ setOgolneStatystyki, angielskiText, dataObj });
              setTriggerReload((prev) => !prev);
              zmianaWagi(setFiszki, indexFiszek, indexX, "znam");
              if (flipped) {
                rotation.value = 0;
                setFlipped(!flipped);
              }
            }}
          >
            <Text className="m-auto text-3xl color-border-know font-buttons">Znam</Text>
          </Pressable>
          <Pressable
            className="w-[30vw] h-16 bg-btn-maybe border-2 border-border-maybe rounded-full shadow-xl"
            onPress={() => {
              zamianaZnamNieZnam({ param: 1, setFiszki, fiszki, indexFiszek, indexX });
              dodawanieStat({ setOgolneStatystyki, angielskiText, dataObj });
              setTriggerReload((prev) => !prev);
              zmianaWagi(setFiszki, indexFiszek, indexX, "troche");
              if (flipped) {
                rotation.value = 0;
                setFlipped(!flipped);
              }
            }}
          >
            <Text className="m-auto text-center text-1xl color-border-maybe font-buttons">
              Troche znam, a troche nie znam
            </Text>
          </Pressable>
          <Pressable
            className="w-[30vw] h-16 bg-btn-dontKnow border-2 border-border-dontKnow rounded-full shadow-xl"
            onPress={() => {
              zamianaZnamNieZnam({ param: 0, setFiszki, fiszki, indexFiszek, indexX });
              dodawanieStat({ setOgolneStatystyki, angielskiText, dataObj });
              setTriggerReload((prev) => !prev);
              zmianaWagi(setFiszki, indexFiszek, indexX, "nieZnam");
              if (flipped) {
                rotation.value = 0;
                setFlipped(!flipped);
              }
            }}
          >
            <Text className="m-auto text-3xl color-border-dontKnow font-buttons">Nie znam</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
