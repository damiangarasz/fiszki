import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { DodajFiszkeEkranProp } from "../types.ts";

export default function DodajFiszkeEkran({
  setDodajFiszke,
  setFiszki,
  fiszkaDoEdycji,
}: DodajFiszkeEkranProp) {
  const [polskiText, setPolskiText] = useState("");
  const [angielskiText, setAngielskiText] = useState("");
  const [kontekstText, setKontekstText] = useState("");

  function dodawanieFiszki() {
    setFiszki((prev) => {
      const edycja = [...prev];
      const nowaFiszka = { polski: polskiText, angielski: angielskiText, kontekst: kontekstText };
      edycja[fiszkaDoEdycji].lista.push(nowaFiszka);
      return edycja;
    });
  }

  return (
    <View className=" w-[75%] h-[75%] m-auto shadow-xl">
      <TextInput
        placeholder="polski"
        className="shadow-xl h-10 w-[75%] m-auto"
        onChangeText={setPolskiText}
        maxLength={25}
      />
      <TextInput
        placeholder="angielski"
        className="shadow-xl h-10 w-[75%] m-auto"
        onChangeText={setAngielskiText}
        maxLength={25}
      />
      <TextInput
        placeholder="kontekst"
        onChangeText={setKontekstText}
        maxLength={200}
        multiline={true}
        className="shadow-xl h-28 w-[75%] m-auto"
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
