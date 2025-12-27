import { Stack } from "expo-router";
import { FiszkiProvider } from "./context/FiszkiContext";
import "./globals.css";

export default function RootLayout() {
  return (
    <FiszkiProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </FiszkiProvider>
  );
}
