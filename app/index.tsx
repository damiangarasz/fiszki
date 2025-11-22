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
  const [fiszki, setFiszki] = useState<fiszki>([{}]);

  //odczyt fiszek z perm memory i zaps w setFiszki
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("fiszki");
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        // error reading value
      }
    };

    getData().then((data) => {
      setFiszki(data);
    });
  }, []);

  //zapis w perm memory
  useEffect(() => {
    const storeData = async (value: fiszki) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("fiszki", jsonValue);
      } catch (e) {
        // saving error
      }
    };
    storeData(fiszki);
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
