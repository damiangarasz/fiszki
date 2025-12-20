import { useState } from "react";
import { FlatList, Keyboard, Pressable, Text, TouchableWithoutFeedback, View } from "react-native";
import { propEdycja } from "../types.ts";
import DodajFiszkeEkran from "./DodajFiszkeEkran.tsx";

export default function Edycja({ navigation, fiszki, setFiszki, fiszkaDoEdycji }: propEdycja) {
  const [zapisNowejFiszki, setZapisNowejFiszki] = useState(false);

  const [dodajFiszke, setDodajFiszke] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="h-[100%] w-[100%]">
        <View className="flex flex-row w-[100%]">
          <Pressable
            className="w-[50%] h-16 bg-green-600"
            onPress={() => {
              setDodajFiszke(true);
            }}
          >
            <Text className="text-center m-auto text-5xl">Dodaj fiszkę</Text>
          </Pressable>
          <Pressable
            className="w-[50%] h-16 bg-red-700"
            onPress={() => {
              setFiszki((prev) => {
                const newArr = [...prev];
                newArr.splice(fiszkaDoEdycji, 1);
                return newArr;
              });
              navigation.navigate("main");
            }}
          >
            <Text className="text-center m-auto text-5xl">Usuń wszystkie</Text>
          </Pressable>
        </View>
        {dodajFiszke ? (
          <DodajFiszkeEkran
            setDodajFiszke={setDodajFiszke}
            setFiszki={setFiszki}
            fiszki={fiszki}
            fiszkaDoEdycji={fiszkaDoEdycji}
          />
        ) : (
          <></>
        )}
        <View className="w-[75%] h-[40] m-auto ">
          <Text className="text-center text-3xl">{fiszki[fiszkaDoEdycji]?.key}</Text>
        </View>
        <View className="bg-white w-[75%] h-[75%] m-auto shadow-2xl">
          <FlatList
            data={fiszki[fiszkaDoEdycji]?.lista ?? []}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View className="border-b border-gray-400 border-dotted">
                <Pressable className="flex flex-row justify-around h-8">
                  <Text className="w-[50%] text-center m-auto">{item.polski}</Text>
                  <Text className="w-[50%] text-center m-auto">{item.angielski}</Text>
                </Pressable>

                <Pressable>
                  <Text className="text-center">{item.kontekst}</Text>
                </Pressable>
              </View>
            )}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
