import { useCallback, useState } from "react";
import { FlatList, Keyboard, Pressable, Text, TouchableWithoutFeedback, View } from "react-native";
import { useFiszki } from "../context/FiszkiContext.tsx";
import DodajFiszkeEkran from "./DodajFiszkeEkran.tsx";
import { FiszkaMemo, MainScreenNavigationProp } from "./EdycjaTypes.ts";
import FiszkaItem from "./FiszkaItemMemo.tsx";

export default function Edycja({ navigation }: MainScreenNavigationProp) {
  const {
    setFiszki,
    fiszkaDoEdycji,
    fiszki,
    setDodajFiszke,
    dodajFiszke,
    setPolskiText,
    setAngielskiText,
    setKontekstText,
    setIdEdytowanejFiszki,
  } = useFiszki();
  const [czyUsunac, setCzyUsunac] = useState(false);

  const handleEdit = useCallback(
    (polski: string, angielski: string, kontekst: string, id: string) => {
      setPolskiText(polski);
      setAngielskiText(angielski);
      setKontekstText(kontekst);
      setDodajFiszke(true);
      setIdEdytowanejFiszki(id);
    },
    []
  );

  const renderItem = useCallback(({ item }: { item: FiszkaMemo }) => {
    return <FiszkaItem {...item} handleEdit={handleEdit} />;
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="h-[100%] w-[100%] bg-[#faf4e8]">
        <View className="flex flex-row w-[100%] justify-evenly">
          <Pressable
            className="w-[40vw] h-16 mt-3 bg-[#e1eed4] border-2 border-[#53985d] rounded-md shadow-xl"
            onPress={() => {
              setCzyUsunac(false);
              setDodajFiszke(true);
            }}
          >
            <Text className="text-center m-auto text-2xl">Dodaj fiszkę</Text>
          </Pressable>
          <Pressable
            className="w-[40vw] h-16 mt-3 bg-[#f9d5d5] border-2 border-[#a82b2d] rounded-md shadow-xl"
            onPress={() => {
              setDodajFiszke(false);
              setCzyUsunac(true);
            }}
          >
            <Text className="text-center m-auto text-2xl">Usuń wszystkie</Text>
          </Pressable>
        </View>

        {czyUsunac ? (
          <View className="w-[75%] h-[15vh] m-auto ">
            <Text className="m-auto text-xl">Czy na pewno usunąć?</Text>
            <View className="w-[100%] flex-row justify-evenly">
              <Pressable
                className="w-[30vw] h-16 mt-3 bg-[#f9d5d5] border-2 border-[#a82b2d] rounded-md shadow-xl"
                onPress={() => {
                  setFiszki((prev) => {
                    const newArr = [...prev];
                    newArr.splice(fiszkaDoEdycji, 1);
                    return newArr;
                  });
                  setCzyUsunac(false);
                  navigation.navigate("Edycja");
                }}
              >
                <Text className="m-auto">TAK</Text>
              </Pressable>
              <Pressable
                className="w-[30vw] h-16 mt-3 bg-[#e1eed4] border-2 border-[#53985d] rounded-md shadow-xl"
                onPress={() => {
                  setCzyUsunac(false);
                }}
              >
                <Text className="m-auto">NIE</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <></>
        )}

        {dodajFiszke ? <DodajFiszkeEkran /> : <></>}
        <View className="w-[75%] h-[40] m-auto ">
          <Text className="text-center text-3xl">{fiszki[fiszkaDoEdycji]?.key}</Text>
        </View>
        <View className="bg-[#faf4e8] w-[75%] h-[75%] m-auto shadow-2xl rounded-2xl">
          <FlatList
            data={fiszki[fiszkaDoEdycji]?.lista ?? []}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
