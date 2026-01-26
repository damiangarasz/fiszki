import { useFiszki } from "@/app/context/FiszkiContext";
import { BottomTabNavigation } from "@/app/types";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { setStatWidth } from "../utilities/helpers/setStatWidth";

export default function DolneWykresy() {
  const { fiszki, setJakiZestawDoWyswietlenia, setIndexFiszek } = useFiszki();

  useFocusEffect(useCallback(() => {}, []));

  const navigation = useNavigation<BottomTabNavigation>();

  return (
    <View className="w-[100%] h-[60%] bg-[#faf4e8] gap-3">
      <FlatList
        data={fiszki}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={(item) => {
          const lista = item.item.lista;
          const { wiem, nieWiem, trocheWiem } = setStatWidth(lista);
          return (
            <Pressable
              onPress={() => {
                setJakiZestawDoWyswietlenia(item.item.key);
                setIndexFiszek(item.index);
                navigation.navigate("Moje Fiszki");
              }}
            >
              <View className="flex-row justify-between h-7 items-end">
                <Text className="text-[#9b6b46] ml-2">{item.item.key}</Text>
                <Text className="text-[#9b6b46] mr-2">{`Ilość fiszek: ${item.item.lista.length}`}</Text>
              </View>
              <View className="flex-row w-[100%]">
                <View className={` bg-[#53985d] h-3`} style={{ width: `${wiem}%` }}></View>
                <View className={`bg-[#71a5d7] h-3`} style={{ width: `${nieWiem}%` }}></View>
                <View className={`bg-[#a82b2d] h-3`} style={{ width: `${trocheWiem}%` }}></View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
