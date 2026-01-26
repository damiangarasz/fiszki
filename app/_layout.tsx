import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { FiszkiProvider } from "./context/FiszkiContext";
import "./globals.css";

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#9b6b46");
      NavigationBar.setButtonStyleAsync("light");
    }
  }, []);
  return (
    <FiszkiProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </FiszkiProvider>
  );
}
