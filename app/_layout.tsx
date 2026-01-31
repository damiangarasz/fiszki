import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform, View } from "react-native";
import { FiszkiProvider } from "./context/FiszkiContext";
import "./globals.css";

export default function RootLayout() {
  //strick, chenge when will add premium themes, attach with context
  const activeTheme = "default";

  //Font loader
  const [fontsLoaded] = useFonts({
    SourGummy: require("../assets/fonts/SourGummy_Expanded-Light.ttf"),
    PatrickHand: require("../assets/fonts/default/PatrickHand-Regular.ttf"),
    Roboto: require("../assets/fonts/default/Roboto-VariableFont.ttf"),
  });

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#9b6b46");
      NavigationBar.setButtonStyleAsync("light");
    }
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <FiszkiProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </FiszkiProvider>
    </View>
  );
}
