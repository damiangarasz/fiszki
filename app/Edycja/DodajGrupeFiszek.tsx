import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { DodajGrupeFiszekProp } from "../types";

export default function DodajGrupeFiszek({
  navigation,
  fiszki,
  setFiszki,
  setDodajGrupeFiszek,
  setFiszkaDoEdycji,
}: DodajGrupeFiszekProp) {
  const [nazwaFiszki, setNazwaFiszki] = useState("");

  //funkcja dodająca nowy zestaw fiszek do istniejącego zestawu
  function dodajFiszke() {
    setFiszki((prev) => {
      const nowaFiszka = { key: nazwaFiszki, lista: [] };
      const newArr = [...prev, nowaFiszka];
      return newArr;
    });
  }

  return (
    <View className="bg-white w-[75%] h-[45%] m-auto shadow-xl">
      <Text className="mx-auto text-2xl text-center">Wpipsz swoją nazwę zestawu fiszek.</Text>
      <TextInput
        className="bg-white shadow-xl h-10 w-[75%] m-auto"
        placeholder="Twoja nazwa"
        placeholderTextColor="#9ca3af"
        onChangeText={setNazwaFiszki}
        maxLength={25}
      />
      <View className="flex-row justify-around">
        <Pressable
          className="w-[50%] h-16 bg-green-600"
          onPress={() => {
            dodajFiszke();
            navigation.navigate("edycja");
            setFiszkaDoEdycji(() => fiszki.length);
            //TODO Tutaj jestem
          }}
        >
          <Text className="text-center text-5xl m-auto">Dodaj</Text>
        </Pressable>
        <Pressable
          className="w-[50%] h-16 bg-red-700"
          onPress={() => {
            setDodajGrupeFiszek(false);
          }}
        >
          <Text className="text-center text-5xl m-auto">Anuluj</Text>
        </Pressable>
      </View>
    </View>
  );
}
