import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import FiszkiEdycja from "./Edycja/FiszkiEdycja";
import FiszkiStatystyki from "./Statystyki/FiszkiStatystyki.tsx";
import MojeFiszkiEkran from "./UI/MojeFiszkiEkran.tsx";
import { fiszki } from "./types.ts";
import { useFiszki } from "./context/FiszkiContext.tsx";

export default function Index() {

  //Context API


  //Ładowanie fonta
  const [fontsLoaded] = useFonts({
    SourGummy: require("../assets/fonts/SourGummy_Expanded-Light.ttf"),
  });

  const Tab = createBottomTabNavigator();


  //TODO refaktor, użyć components i wybrać odpowiednią metodę prop

  const MojeFiszki = () => {
    return <MojeFiszkiEkran fiszki={fiszki} setFiszki={setFiszki} />;
  };

  const Edycja = () => {
    return (
      <FiszkiEdycja
        fiszki={fiszki}
        setFiszki={setFiszki}
        setFiszkaDoEdycji={setFiszkaDoEdycji}
        fiszkaDoEdycji={fiszkaDoEdycji}
      />
    );
  };

  return (
    <>
      <StatusBar style="light" translucent={false} />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#9b6b46" },
          tabBarActiveTintColor: "#e1eed4",
          tabBarInactiveTintColor: "white",
        }}
      >
        <Tab.Screen name="Moje Fiszki" component={MojeFiszki} />
        <Tab.Screen name="Edycja" component={Edycja} />
        <Tab.Screen name="Statsy" component={FiszkiStatystyki} />
      </Tab.Navigator>
    </>
  );
}
