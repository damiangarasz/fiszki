import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform, View } from "react-native";
import { FiszkiProvider } from "./context/FiszkiContext";
import "./globals.css";
import { vars } from "nativewind";
import { THEMES } from "./constants/themes.ts";

export default function RootLayout() {
  //strick, chenge when will add premium themes, attach with context
  const activeTheme = "default";
  const themeVars = THEMES[activeTheme];

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#9b6b46");
      NavigationBar.setButtonStyleAsync("light");
    }
  }, []);
  return (
    <View style={{ flex: 1, ...vars(themeVars) }}>
      <FiszkiProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </FiszkiProvider>
    </View>
  );
}
