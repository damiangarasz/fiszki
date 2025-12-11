import { Pressable, Text, View } from "react-native";
import { FiszkiWyswietlanieProp } from "../types.ts";

export default function FiszkiWyswietlanie({ fiszki }: FiszkiWyswietlanieProp) {
  return (
    <View className="w-[75%] h-[75%] m-auto shadow-2xl">
      {fiszki.length == 0 ? (
        <View>
          <Text className="text-center text-4xl">
            Brak fiszek! Dodaj pierwszą w  &#34;Edycja&#34;
          </Text>
        </View>
      ) : (
        fiszki.map((param, index) => {
          return (
            <View key={index} className="border-b border-gray-400 border-dotted">
              <Pressable>
                <Text className="w-[50%] text-center m-auto text-2xl">{param.key}</Text>
              </Pressable>
            </View>
          );
        })
      )}
    </View>
  );
}
