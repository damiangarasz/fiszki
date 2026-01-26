import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import FiszkiEdycja from "./Edycja/FiszkiEdycjaEkran.tsx";
import FiszkiStatystyki from "./Statystyki/FiszkiStatystykiEkran.tsx";
import MojeFiszkiEkran from "./UI/MojeFiszkiEkran.tsx";
import { RootTabParamList } from "./types.ts";

export default function Index() {
  //Ładowanie fonta
  const [fontsLoaded] = useFonts({
    SourGummy: require("../assets/fonts/SourGummy_Expanded-Light.ttf"),
  });

  const Tab = createBottomTabNavigator<RootTabParamList>();

  return (
    <>
      <StatusBar style="light" translucent={false} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor: "#9b6b46" },
          tabBarActiveTintColor: "#e1eed4",
          tabBarInactiveTintColor: "white",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "home";

            if (route.name === "Moje Fiszki") {
              iconName = focused ? "albums" : "albums-outline";
            } else if (route.name === "Edycja") {
              iconName = focused ? "create" : "create-outline";
            } else if (route.name === "Statsy") {
              iconName = focused ? "stats-chart" : "stats-chart-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Moje Fiszki" component={MojeFiszkiEkran} />
        <Tab.Screen name="Edycja" component={FiszkiEdycja} />
        <Tab.Screen name="Statsy" component={FiszkiStatystyki} />
      </Tab.Navigator>
    </>
  );
}
