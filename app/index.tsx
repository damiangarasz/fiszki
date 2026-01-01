import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import FiszkiEdycja from "./Edycja/FiszkiEdycjaEkran.tsx";
import FiszkiStatystyki from "./Statystyki/FiszkiStatystykiEkran.tsx";
import MojeFiszkiEkran from "./UI/MojeFiszkiEkran.tsx";

export default function Index() {
  //Ładowanie fonta
  const [fontsLoaded] = useFonts({
    SourGummy: require("../assets/fonts/SourGummy_Expanded-Light.ttf"),
  });

  const Tab = createBottomTabNavigator();

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
        <Tab.Screen name="Moje Fiszki" component={MojeFiszkiEkran} />
        <Tab.Screen name="Edycja" component={FiszkiEdycja} />
        <Tab.Screen name="Statsy" component={FiszkiStatystyki} />
      </Tab.Navigator>
    </>
  );
}
