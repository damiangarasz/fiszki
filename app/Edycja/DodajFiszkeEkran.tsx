import * as Crypto from "expo-crypto";
import { Pressable, Text, TextInput, View } from "react-native";
import { useFiszki } from "../context/FiszkiContext.tsx";

export default function DodajFiszkeEkran() {
  const {
    setFiszki,
    fiszkaDoEdycji,
    setDodajFiszke,
    polskiText,
    angielskiText,
    kontekstText,
    setPolskiText,
    setAngielskiText,
    setKontekstText,
  } = useFiszki();

  function dodawanieFiszki() {
    setFiszki((prev) => {
      //Głęboka kopia żeby react odświeżył stan
      const edycja = prev.map((item, index) => {
        if (index == fiszkaDoEdycji) {
          return {
            ...item,
            lista: [
              ...item.lista,
              {
                id: Crypto.randomUUID(),
                polski: polskiText,
                angielski: angielskiText,
                kontekst: kontekstText,
                waga: 1,
              },
            ],
          };
        }
        return item;
      });
      return edycja;
    });
    setPolskiText("");
    setAngielskiText("");
    setKontekstText("");
  }

  return (
    <View className="bg-[#faf4e8] rounded-xl w-[75%] h-auto mx-auto shadow-xl mt-2">
      <TextInput
        placeholder="polski"
        value={polskiText}
        placeholderTextColor="#9ca3af"
        className="bg-white shadow-xl h-10 w-[75%] mx-auto my-5"
        onChangeText={setPolskiText}
        maxLength={25}
      />
      <TextInput
        placeholder="angielski"
        value={angielskiText}
        placeholderTextColor="#9ca3af"
        className="bg-white shadow-xl h-10 w-[75%] mx-auto my-5"
        onChangeText={setAngielskiText}
        maxLength={25}
      />
      <TextInput
        placeholder="kontekst"
        value={kontekstText}
        placeholderTextColor="#9ca3af"
        onChangeText={setKontekstText}
        maxLength={200}
        multiline={true}
        className="bg-white shadow-xl h-28 w-[75%] mx-auto my-5"
      />
      <View className="flex-row justify-around my-1">
        <Pressable
          className="w-[30vw] h-16  bg-[#e1eed4] border-2 border-[#53985d] rounded-full shadow-xl"
          onPress={() => {
            if (polskiText.length >= 2 && angielskiText.length >= 2) dodawanieFiszki();
          }}
        >
          <Text className="text-center text-2xl m-auto">Dodaj</Text>
        </Pressable>
        <Pressable
          className="w-[30vw] h-16 bg-[#f9d5d5] border-2 border-[#a82b2d] rounded-full shadow-xl"
          onPress={() => {
            setDodajFiszke(false);
          }}
        >
          <Text className="text-center text-2xl m-auto">Odrzuć</Text>
        </Pressable>
      </View>
    </View>
  );
}
