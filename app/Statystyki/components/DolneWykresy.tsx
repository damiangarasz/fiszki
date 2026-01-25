import { useFiszki } from "@/app/context/FiszkiContext";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import { setStatWidth } from "../utilities/helpers/setStatWidth";

export default function DolneWykresy() {
  const { fiszki } = useFiszki();

  useFocusEffect(useCallback(() => {}, []));
  return (
    <View className="w-[100%] h-[60%] bg-white">
      <FlatList
        data={fiszki}
        keyExtractor={(_, index) => index.toString()}
        renderItem={(item) => {
          const lista = item.item.lista;
          const { wiem, nieWiem, trocheWiem } = setStatWidth(lista);
          return (
            <View className="w-[100%]">
              <View>
                <Text>{item.item.key}</Text>
                <Text>{`Ilość fiszek: ${item.item.lista.length}`}</Text>
              </View>
              <View className="flex-row">
                <View className={`w-[${wiem}%] bg-[#53985d] h-1`}></View>
                <View className={`w-[${trocheWiem}%] bg-[#71a5d7] h-1`}></View>
                <View className={`w-[${nieWiem}%] bg-[#a82b2d] h-1`}></View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
