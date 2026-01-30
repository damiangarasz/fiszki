import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useFiszki } from "../../../context/FiszkiContext.tsx";
import { MainScreenNavigationProp } from "../../EdycjaTypes.ts";

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
    <View className="rounded-xl w-[75%] h-[30%] my-3 mx-auto shadow-xl text-primary bg-[#faf4e8]">
      <Text className="mx-auto text-2xl text-center font-primary text-text-primary">
        Wpisz swoją nazwę zestawu fiszek.
      </Text>
      <TextInput
        className="bg-in-bg shadow-xl h-10 w-[75%] m-auto my-5 p-2"
        placeholder="Twoja nazwa"
        placeholderTextColor="#9ca3af"
        style={{ color: "black" }}
        onChangeText={setNazwaFiszki}
        maxLength={25}
      />
      <View className="flex-row justify-around mb-5">
        <Pressable
          className="w-[30vw] h-16  bg-btn-add border-2 border-border-add rounded-md shadow-md"
          onPress={() => {
            if (nazwaFiszki.length < 1) return;
            dodajFiszke();
            navigation.navigate("edycja");
            setFiszkaDoEdycji(() => fiszki.length);
          }}
        >
          <Text className="text-center text-3xl m-auto font-buttons">Dodaj</Text>
        </Pressable>
        <Pressable
          className="w-[30vw] h-16 bg-btn-cancel border-2 border-border-cancel rounded-md shadow-md"
          onPress={() => {
            setDodajGrupeFiszek(false);
          }}
        >
          <Text className="text-center text-3xl m-auto font-buttons">Anuluj</Text>
        </Pressable>
      </View>
    </View>
  );
}
