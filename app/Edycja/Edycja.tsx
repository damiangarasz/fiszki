import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { propEdycja } from "../types.ts";
import DodajFiszkeEkran from "./DodajFiszkeEkran.tsx";

export default function Edycja({ navigation, fiszki, setFiszki, fiszkaDoEdycji }: propEdycja) {
  const [zapisNowejFiszki, setZapisNowejFiszki] = useState(false);

  const [dodajFiszke, setDodajFiszke] = useState(false);

  return (
    <View className="h-[100%]">
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
              console.log(newArr);
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
          fiszkaDoEdycji={fiszkaDoEdycji}
        />
      ) : (
        <></>
      )}

      {/* nie pokazuje odrazu jebanych fiszek tylko jak odświeze */}

      {fiszki[fiszkaDoEdycji].lista ? (
        fiszki[fiszkaDoEdycji].lista.map((param, index) => {
          return (
            <View key={index}>
              <Pressable>
                <Text>{param.polski}</Text>
                <Text>{param.angielski}</Text>
                <Text>{param.kontekst}</Text>
              </Pressable>
            </View>
          );
        })
      ) : (
        <></>
      )}
    </View>
  );
}
