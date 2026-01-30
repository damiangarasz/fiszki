import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Logowanie from "./components/Logowanie";
import Motyw from "./components/Motyw";
import OpcjeMain from "./components/OpcjeMain";
import PrzejdzNaPro from "./components/PrzejdzNaPro";
import Udostepnianie from "./components/Udostepnianie";

export default function Opcje() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: "#9b6b46" }} initialRouteName="Opcje Main">
      <Stack.Screen
        name="Opcje Main"
        options={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#9b6b46",
          },
        }}
        component={OpcjeMain}
      />
      <Stack.Screen
        name="Pzrejdź na PRO"
        options={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#9b6b46",
          },
        }}
        component={PrzejdzNaPro}
      />
      <Stack.Screen
        name="Logowanie"
        options={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#9b6b46",
          },
        }}
        component={Logowanie}
      />
      <Stack.Screen
        name="Motyw"
        options={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#9b6b46",
          },
        }}
        component={Motyw}
      />
      <Stack.Screen
        name="Udostepnianie"
        options={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#9b6b46",
          },
        }}
        component={Udostepnianie}
      />
    </Stack.Navigator>
  );
}
