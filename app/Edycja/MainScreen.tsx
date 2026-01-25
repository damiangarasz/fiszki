import { Keyboard, Pressable, Text, TouchableWithoutFeedback, View } from "react-native";
import { useFiszki } from "../context/FiszkiContext.tsx";
import DodajGrupeFiszek from "./DodajGrupeFiszek.tsx";
import { MainScreenNavigationProp } from "./EdycjaTypes.ts";

export default function MainScreen({ navigation }: MainScreenNavigationProp) {
  const { fiszki, setFiszkaDoEdycji, setDodajGrupeFiszek, dadajGrupeFiszek } = useFiszki();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="w-[100%] h-[100%] bg-[#faf4e8]">
        <Pressable
          className="w-[90vw] h-16 mt-4 mx-auto bg-[#faf4e8] border-2 border-[#9b6b46] rounded-md shadow-xl"
          onPress={() => {
            setDodajGrupeFiszek(true);
          }}
        >
          <Text className="text-[#9b6b46] text-center m-auto text-5xl">Dodaj nowe</Text>
        </Pressable>
        {dadajGrupeFiszek ? <DodajGrupeFiszek navigation={navigation} /> : <></>}
        <View className="bg-[#faf4e8] w-[75%] h-[75%] shadow-2xl m-auto rounded-xl">
          {fiszki.map((element, index) => {
            const key = Object.keys(element)[0] + index;
            return (
              <View key={key} className="border-b border-gray-400 border-dotted">
                <Pressable
                  className="flex flex-row justify-around h-8"
                  onPress={() => {
                    navigation.navigate("edycja");
                    setFiszkaDoEdycji(index);
                  }}
                >
                  <Text className="w-[50%] text-center m-auto text-2xl">{element.key}</Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
