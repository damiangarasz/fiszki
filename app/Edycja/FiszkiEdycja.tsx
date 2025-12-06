import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { MainScreenProps, propFiszkiEdycja } from "../types.ts";
import Edycja from "./Edycja.tsx";
import DodajGrupeFiszek from "./DodajGrupeFiszek.tsx"

export default function FiszkiEdycja({ fiszki, setFiszki }: propFiszkiEdycja) {
  const Stack = createStackNavigator();

  const [fiszkaDoEdycji, setFiszkaDoEdycji] = useState<string>("");
  const [dadajGrupeFiszek, setDodajGrupeFiszek] = useState(false);

  function EdycjaEkran() {
    return <Edycja fiszki={fiszki} setFiszki={setFiszki} fiszkaDoEdycji={fiszkaDoEdycji} />;
  }

  function DodajGrupeFiszekEkran() {
    return <DodajGrupeFiszek setFiszki={setFiszki} setDodajGrupeFiszek={setDodajGrupeFiszek} />;
  }

  function MainScreen({ navigation, fiszki, setFiszki }: MainScreenProps) {
    return (
      <View className="w-[100%] h-[100%]">
        <Pressable
          onPress={() => {
            setDodajGrupeFiszek(true);
          }}
        >
          <Text>Dodaj nowe</Text>
        </Pressable>
        {dadajGrupeFiszek ? <DodajGrupeFiszekEkran /> : <></>}
        {fiszki.map((element, index) => {
          const key = Object.keys(element)[0] + index;
          return (
            <View key={key}>
              <Pressable
                onPress={() => {
                  navigation.navigate("edycja");
                  setFiszkaDoEdycji(element.key);
                }}
              >
                <Text>{element.key}</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{}} initialRouteName="main">
      <Stack.Screen name="main">
        {(props) => <MainScreen {...props} fiszki={fiszki} setFiszki={setFiszki} />}
      </Stack.Screen>
      <Stack.Screen name="edycja">{() => EdycjaEkran()}</Stack.Screen>
    </Stack.Navigator>
  );
}
