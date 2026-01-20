import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MojeFiszkiEkranMain from "./MojeFiszkiEkranMain.tsx";
import WyswietlanieKart from "./WyswietlanieKart.tsx";

export default function FiszkiWyswietlanie() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerTintColor: "#9b6b46" }} initialRouteName="Moje Fiszki">
      <Stack.Screen
        name="Moje Fiszki"
        options={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#9b6b46",
          },
        }}
        component={MojeFiszkiEkranMain}
      />
      <Stack.Screen
        name="wyswietlanie"
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: "#9b6b46",
          headerStyle: {
            backgroundColor: "#9b6b46",
          },
        }}
        component={WyswietlanieKart}
      />
    </Stack.Navigator>
  );
}
