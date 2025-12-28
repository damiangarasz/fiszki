import { createStackNavigator } from "@react-navigation/stack";
import Edycja from "./Edycja.tsx";
import MainScreen from "./MainScreen.tsx";

export default function FiszkiEdycja() {
  const Stack = createStackNavigator();

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
        component={MainScreen}
      />
      <Stack.Screen
        name="edycja"
        options={{
          headerTintColor: "white",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#9b6b46",
          },
        }}
        component={Edycja}
      />
    </Stack.Navigator>
  );
}
