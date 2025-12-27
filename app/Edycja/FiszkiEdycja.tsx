import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import { Keyboard, Pressable, Text, TouchableWithoutFeedback, View } from "react-native";
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

  function MainScreen({ navigation, fiszki, setFiszki }: MainScreenProps) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-[100%] h-[100%] bg-[#faf4e8]">
          <Pressable
            className="w-[90vw] h-16 mt-4 mx-auto bg-[#e1eed4] border-2 border-[#53985d] rounded-full shadow-xl"
            onPress={() => {
              setDodajGrupeFiszek(true);
            }}
          >
            <Text className="text-center m-auto text-5xl">Dodaj nowe</Text>
          </Pressable>
          {dadajGrupeFiszek ? (
            <DodajGrupeFiszek
              navigation={navigation}
              fiszki={fiszki}
              setFiszki={setFiszki}
              setDodajGrupeFiszek={setDodajGrupeFiszek}
              setFiszkaDoEdycji={setFiszkaDoEdycji}
            />
          ) : (
            <></>
          )}
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

  return (
    <Stack.Navigator screenOptions={{}} initialRouteName="Edycja">
      <Stack.Screen
        name="Edycja"
        options={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#9b6b46",
          },
        }}
      >
        {(props) => <MainScreen {...props} fiszki={fiszki} setFiszki={setFiszki} />}
      </Stack.Screen>
      <Stack.Screen
        name="edycja"
        options={{
          headerTintColor: "white",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#9b6b46",
          },
        }}
      >
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
