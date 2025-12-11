import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { EdycjaScreenProps, MainScreenProps, propFiszkiEdycja } from "../types.ts";
import DodajGrupeFiszek from "./DodajGrupeFiszek.tsx";
import Edycja from "./Edycja.tsx";

export default function FiszkiEdycja({
  fiszki,
  setFiszki,
  setFiszkaDoEdycji,
  fiszkaDoEdycji,
}: propFiszkiEdycja) {
  const Stack = createStackNavigator();

  const [dadajGrupeFiszek, setDodajGrupeFiszek] = useState(false);

  // DEBUGOWANIE
  useEffect(() => {
    console.log("fiszka do edycji:", fiszkaDoEdycji);
  }, [fiszki]);
  useEffect(() => {
    console.log("fiszkafiszka", fiszkaDoEdycji);
  }, [fiszkaDoEdycji]);
  //KONICE DEBUGOWANIA

  function EdycjaEkran({ navigation, fiszki, setFiszki, fiszkaDoEdycji }: EdycjaScreenProps) {
    return (
      <Edycja
        navigation={navigation}
        fiszki={fiszki}
        setFiszki={setFiszki}
        fiszkaDoEdycji={fiszkaDoEdycji}
      />
    );
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
                  setFiszkaDoEdycji(index);
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
      <Stack.Screen name="edycja">
        {(props) => (
          <EdycjaEkran
            {...props}
            fiszki={fiszki}
            setFiszki={setFiszki}
            fiszkaDoEdycji={fiszkaDoEdycji}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
