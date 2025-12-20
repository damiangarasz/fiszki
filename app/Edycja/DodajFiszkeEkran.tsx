import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { DodajFiszkeEkranProp } from "../types.ts";

export default function DodajFiszkeEkran({
  setDodajFiszke,
  setFiszki,
  fiszki,
  fiszkaDoEdycji,
}: DodajFiszkeEkranProp) {
  const [polskiText, setPolskiText] = useState("");
  const [angielskiText, setAngielskiText] = useState("");
  const [kontekstText, setKontekstText] = useState("");

  function dodawanieFiszki() {
    setFiszki((prev) => {
      const edycja = [...prev];
      const nowaFiszka = {
        polski: polskiText,
        angielski: angielskiText,
        kontekst: kontekstText,
        waga: 1,
      };
      edycja[fiszkaDoEdycji].lista.push(nowaFiszka);
      return edycja;
    });
  }

  return (
    <View className="bg-white w-[75%] h-auto m-auto shadow-xl">
      <TextInput
        placeholder="polski"
        placeholderTextColor="#9ca3af"
        className="bg-white shadow-xl h-10 w-[75%] mx-auto my-5"
        onChangeText={setPolskiText}
        maxLength={25}
      />
      <TextInput
        placeholder="angielski"
        placeholderTextColor="#9ca3af"
        className="bg-white shadow-xl h-10 w-[75%] mx-auto my-5"
        onChangeText={setAngielskiText}
        maxLength={25}
      />
      <TextInput
        placeholder="kontekst"
        placeholderTextColor="#9ca3af"
        onChangeText={setKontekstText}
        maxLength={200}
        multiline={true}
        className="bg-white shadow-xl h-28 w-[75%] mx-auto my-5"
      />
      <View className="flex-row justify-around">
        <Pressable
          className="w-[50%] h-16 bg-green-600"
          onPress={() => {
            dodawanieFiszki();
          }}
        >
          <Text className="text-center text-5xl m-auto">Dodaj</Text>
        </Pressable>
        <Pressable
          className="w-[50%] h-16 bg-red-700"
          onPress={() => {
            setDodajFiszke(false);
          }}
        >
          <Text className="text-center text-5xl m-auto">Odrzuć</Text>
        </Pressable>
      </View>
    </View>
  );
}
