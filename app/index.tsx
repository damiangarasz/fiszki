import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import FiszkiEdycja from "./Edycja/FiszkiEdycja";
import FiszkiStatystyki from "./Statystyki/FiszkiStatystyki.tsx";
import MojeFiszkiEkran from "./UI/MojeFiszkiEkran.tsx";
import { fiszki } from "./types.ts";

export default function Index() {
  const Tab = createBottomTabNavigator();

  //zapisane fiszki
  const [fiszki, setFiszki] = useState<fiszki>([]);
  const [fiszkaDoEdycji, setFiszkaDoEdycji] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // odczyt fiszek z perm memory i zaps w setFiszki
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("fiszki");
        if (jsonValue) {
          const parsed = JSON.parse(jsonValue);
          setFiszki(parsed);
        }
      } catch (e) {
        console.error("Error reading fiszki", e);
      } finally {
        setIsLoaded(true);
      }
    };
    getData();
  }, []);

  //zapis w perm memory
  useEffect(() => {
    if (!fiszki) return;
    if (!isLoaded) return;

    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(fiszki);
        await AsyncStorage.setItem("fiszki", jsonValue);
      } catch (e) {
        console.error("Error saving fiszki", e);
      }
    };
    storeData();
  }, [fiszki]);

  //TODO refaktor, użyć components i wybrać odpowiednią metodę prop

  const MojeFiszki = () => {
    return <MojeFiszkiEkran fiszki={fiszki} setFiszki={setFiszki} />;
  };

  const Edycja = () => {
    return (
      <FiszkiEdycja
        fiszki={fiszki}
        setFiszki={setFiszki}
        setFiszkaDoEdycji={setFiszkaDoEdycji}
        fiszkaDoEdycji={fiszkaDoEdycji}
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Moje Fiszki" component={MojeFiszki} />
      <Tab.Screen name="Edycja" component={Edycja} />
      <Tab.Screen name="Statsy" component={FiszkiStatystyki} />
    </Tab.Navigator>
  );
}
