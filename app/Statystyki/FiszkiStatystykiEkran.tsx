import { createStackNavigator } from "@react-navigation/stack";
import { StackParamList } from "./components/ComponentTypes.ts";
import StatyComponent from "./components/StatyComponent.tsx";
import useStatystyki  from "./hooks/useStatystyki.tsx"

export default function FiszkiStatystykiEkran() {
  const Stack = createStackNavigator<StackParamList>();


  return (
    <Stack.Navigator screenOptions={{}} initialRouteName="Staty">
      <Stack.Screen
        name="Staty"
        options={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#9b6b46",
          },
        }}
        component={StatyComponent}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
