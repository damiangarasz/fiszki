import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useFiszki } from "../context/FiszkiContext";
import { MainScreenNavigationProp } from "./EdycjaTypes.ts";

export default function DodajGrupeFiszek({ navigation }: MainScreenNavigationProp) {
  const [nazwaFiszki, setNazwaFiszki] = useState("");

  const { setFiszki, setFiszkaDoEdycji, fiszki, setDodajGrupeFiszek } = useFiszki();

  //funkcja dodająca nowy zestaw fiszek do istniejącego zestawu
  function dodajFiszke() {
    setFiszki((prev) => {
      const nowaFiszka = { key: nazwaFiszki, lista: [] };
      const newArr = [...prev, nowaFiszka];
      return newArr;
    });
  }

  return (
    <View className="rounded-xl w-[75%] h-[45%] my-3 mx-auto shadow-xl bg-[#faf4e8]">
      <Text className="mx-auto text-2xl text-center">Wpipsz swoją nazwę zestawu fiszek.</Text>
      <TextInput
        className="bg-white shadow-xl h-10 w-[75%] m-auto"
        placeholder="Twoja nazwa"
        placeholderTextColor="#9ca3af"
        onChangeText={setNazwaFiszki}
        maxLength={25}
      />
      <View className="flex-row justify-around mb-5">
        <Pressable
          className="w-[30vw] h-16  bg-[#e1eed4] border-2 border-[#53985d] rounded-full shadow-xl"
          onPress={() => {
            dodajFiszke();
            navigation.navigate("edycja");
            setFiszkaDoEdycji(() => fiszki.length);
          }}
        >
          <Text className="text-center text-3xl m-auto">Dodaj</Text>
        </Pressable>
        <Pressable
          className="w-[30vw] h-16 bg-[#f9d5d5] border-2 border-[#a82b2d] rounded-full shadow-xl"
          onPress={() => {
            setDodajGrupeFiszek(false);
          }}
        >
          <Text className="text-center text-3xl m-auto">Anuluj</Text>
        </Pressable>
      </View>
    </View>
  );
}
