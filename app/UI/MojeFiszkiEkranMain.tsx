import { Pressable, ScrollView, Text, View } from "react-native";
import { useFiszki } from "../context/FiszkiContext";
import { MojeFiszkiEkranMainProp } from "../types";

export default function MojeFiszkiEkranMain({ navigation }: MojeFiszkiEkranMainProp) {
  const {
    fiszki,
    setJakiZestawDoWyswietlenia,
    setIndexFiszek,
  } = useFiszki();

  return (
    <View className="bg-[#faf4e8] w-[100%] h-[100%]">
      <View className="bg-[#faf4e8] w-[75%] h-[75%] m-auto shadow-2xl rounded-xl">
        <ScrollView>
          {fiszki.length == 0 ? (
            <View>
              <Text className="text-center text-2xl font-SourGummy">
                Brak fiszek! Dodaj pierwszą w &#34;Edycja&#34;
              </Text>
            </View>
          ) : (
            fiszki.map((param, index: number) => {
              return (
                <View key={index} className="border-b border-gray-400 border-dotted">
                  <Pressable
                    onPress={() => {
                      if (fiszki[index].lista.length > 0) {
                        setJakiZestawDoWyswietlenia(param.key);
                        setIndexFiszek(index);
                        navigation.navigate("wyswietlanie");
                      }
                    }}
                  >
                    <Text className="w-[50%] text-center m-auto text-2xl font-SourGummy">
                      {param.key}
                    </Text>
                    <Text>Ilość fiszek: {fiszki[index].lista.length}</Text>
                  </Pressable>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
}
