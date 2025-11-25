import { createStackNavigator } from "@react-navigation/stack";
import { Pressable, Text, View } from "react-native";
import { propFiszkiEdycja } from "../types.ts";
import Edycja from "./Edycja.tsx";

export default function FiszkiEdycja({ fiszki, setFiszki }: propFiszkiEdycja) {
  const Stack = createStackNavigator();

  function edycja() {
    return <Edycja />;
  }
  function main({ navigation }) {
    return (
      <View className="w-[100%] h-[100%]">
        {fiszki.map((element, index) => {
          const key = Object.keys(element)[0] + index;
          return (
            <View key={key}>
              <Pressable onPress={() => navigation.navigate("edycja")}>
                <Text>{Object.keys(element)}</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{}} initialRouteName="main">
      <Stack.Screen
        name="main"
        component={main}
        options={{
          title: "main",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="edycja"
        component={edycja}
        options={{
          title: "edycja",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
}
