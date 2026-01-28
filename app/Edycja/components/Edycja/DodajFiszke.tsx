import * as Crypto from "expo-crypto";
import { useState, useEffect } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useFiszki } from "../../../context/FiszkiContext.tsx";
import { DodajFiszkeProps } from "../../EdycjaTypes.ts";

export default function DodajFiszke({ objdoedycji }: DodajFiszkeProps) {
  //CONTEXT
  const { setFiszki, fiszkaDoEdycji, setDodajFiszke, idEdytowanejFiszki, setIdEdytowanejFiszki } =
    useFiszki();
  //CONTEXT

  const [polskiText, setPolskiText] = useState("");
  const [angielskiText, setAngielskiText] = useState("");
  const [kontekstText, setKontekstText] = useState("");

  useEffect(() => {
    if (!objdoedycji) return;
    if ("polski" in objdoedycji) {
      const { polski, angielski, kontekst } = objdoedycji;
      setPolskiText(polski);
      setAngielskiText(angielski);
      setKontekstText(kontekst);
    }
  }, [objdoedycji]);

  function dodawanieFiszki() {
    setFiszki((prev) => {
      //Głęboka kopia żeby react odświeżył stan
      if (idEdytowanejFiszki) {
        const calyZestaw = prev.map((zestaw, index) => {
          if (index == fiszkaDoEdycji) {
            const mapaPoFiszkach = zestaw.lista.map((fiszka) => {
              if (fiszka.id == idEdytowanejFiszki) {
                return {
                  ...fiszka,
                  polski: polskiText,
                  angielski: angielskiText,
                  kontekst: kontekstText,
                };
              } else {
                return fiszka;
              }
            });
            return { ...zestaw, lista: mapaPoFiszkach };
          } else {
            return zestaw;
          }
        });
        setIdEdytowanejFiszki("");
        return calyZestaw;
      } else {
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
                  waga: 5,
                  znamNieZnam: 0,
                },
              ],
            };
          }
          return item;
        });
        return edycja;
      }
    });
    setPolskiText("");
    setAngielskiText("");
    setKontekstText("");
  }

  return (
    <View className="bg-[#faf4e8] rounded-xl w-[75%] h-auto mx-auto shadow-xl mt-2">
      <TextInput
        autoCapitalize="none"
        placeholder="polski"
        value={polskiText}
        placeholderTextColor="#9ca3af"
        className="bg-white shadow-xl h-10 w-[75%] mx-auto my-5 p-2"
        style={{ color: "black" }}
        onChangeText={setPolskiText}
        maxLength={25}
        autoComplete="off"
      />
      <TextInput
        autoCapitalize="none"
        placeholder="angielski"
        autoCorrect={false}
        spellCheck={false}
        value={angielskiText}
        placeholderTextColor="#9ca3af"
        className="bg-white shadow-xl h-10 w-[75%] mx-auto my-5 p-2"
        style={{ color: "black" }}
        onChangeText={setAngielskiText}
        maxLength={25}
        autoComplete="off"
      />
      <TextInput
        placeholder="kontekst"
        value={kontekstText}
        placeholderTextColor="#9ca3af"
        textAlignVertical="top"
        onChangeText={setKontekstText}
        style={{ color: "black" }}
        maxLength={200}
        multiline={true}
        autoComplete="off"
        className="bg-white shadow-xl h-28 w-[75%] mx-auto my-5 p-2"
      />
      <View className="flex-row justify-around my-1">
        <Pressable
          className="w-[30vw] h-16  bg-[#e1eed4] border-2 border-[#53985d] rounded-md shadow-xl"
          onPress={() => {
            if (polskiText.length >= 2 && angielskiText.length >= 2) dodawanieFiszki();
          }}
        >
          <Text className="text-center text-2xl m-auto">Dodaj</Text>
        </Pressable>
        <Pressable
          className="w-[30vw] h-16 bg-[#f9d5d5] border-2 border-[#a82b2d] rounded-md shadow-xl"
          onPress={() => {
            setDodajFiszke(false);
            setPolskiText("");
            setAngielskiText("");
            setKontekstText("");
          }}
        >
          <Text className="text-center text-2xl m-auto">Odrzuć</Text>
        </Pressable>
      </View>
    </View>
  );
}
