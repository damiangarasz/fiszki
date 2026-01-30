import { Keyboard, Pressable, Text, TouchableWithoutFeedback, View } from "react-native";
import { useFiszki } from "../../../context/FiszkiContext.tsx";
import { MainScreenNavigationProp } from "../../EdycjaTypes.ts";
import DodajGrupeFiszek from "./DodajGrupeFiszek.tsx";

export default function MainScreen({ navigation }: MainScreenNavigationProp) {
  const { fiszki, setFiszkaDoEdycji, setDodajGrupeFiszek, dadajGrupeFiszek } = useFiszki();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="w-[100%] h-[100%] bg-bg">
        <Pressable
          className="w-[90vw] h-16 mt-4 mx-auto bg-btn-addNew border-2 border-border-addNew rounded-md shadow-xl"
          onPress={() => {
            setDodajGrupeFiszek(true);
          }}
        >
          <Text className="text-text-addNew bg-btn-addNew text-center m-auto text-5xl font-buttons">
            Dodaj nowe
          </Text>
        </Pressable>
        {dadajGrupeFiszek ? <DodajGrupeFiszek navigation={navigation} /> : <></>}
        <View className="bg-bg w-[75%] h-[75%] shadow-2xl m-auto rounded-xl">
          {fiszki.map((element, index) => {
            const key = Object.keys(element)[0] + index;
            return (
              <View key={key} className="border-b border-gray-400 border-dotted py-2">
                <Pressable
                  className="flex flex-row justify-around h-8"
                  onPress={() => {
                    navigation.navigate("edycja");
                    setFiszkaDoEdycji(index);
                  }}
                >
                  <Text className="w-[50%] text-center m-auto text-2xl font-primary text-text-primary">
                    {element.key}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
