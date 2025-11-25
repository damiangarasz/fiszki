import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import FiszkiEdycja from "./Edycja/FiszkiEdycja";
import FiszkiLogowanie from "./Logowanie/FiszkiLogowanie";
import FiszkiWyswietlanie from "./UI/FiszkiWyswietlanie";
import { fiszki } from "./types.ts";

export default function Index() {
  const Tab = createBottomTabNavigator();

  //zapisane fiszki
  const [fiszki, setFiszki] = useState<fiszki>([
    { test: { polski: "string", angielski: "string", konteks: "string" } },
    { lol: { polski: "string", angielski: "string", konteks: "string" } },
    { cos: { polski: "string", angielski: "string", konteks: "string" } },
    { niewiem: { polski: "string", angielski: "string", konteks: "string" } },
  ]);

  const [isLoaded, setIsLoaded] = useState(false);

  //odczyt fiszek z perm memory i zaps w setFiszki
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("fiszki");
        if (jsonValue) {
          const parsed = JSON.parse(jsonValue);
          setFiszki(parsed);
          setIsLoaded(true);
        }
      } catch (e) {
        console.error("Error reading fiszki", e);
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

  const MojeFiszki = () => {
    return <FiszkiWyswietlanie />;
  };

  const Edycja = () => {
    return <FiszkiEdycja fiszki={fiszki} setFiszki={setFiszki} />;
  };

  const Logowanie = () => {
    return <FiszkiLogowanie />;
  };

  return (
    <Tab.Navigator>
      <Tab.Screen name="Moje Fiszki" component={MojeFiszki} />
      <Tab.Screen name="Edycja" component={Edycja} />
      <Tab.Screen name="Logowanie" component={Logowanie} />
    </Tab.Navigator>
  );
}
