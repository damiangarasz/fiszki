import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { FiszkiWyswietlanieProp } from "../types.ts";
import MojeFiszkiEkranMain from "./MojeFiszkiEkranMain.tsx";
import WyswietlanieKart from "./WyswietlanieKart.tsx";

import { useFiszki } from "../context/FiszkiContext.tsx";

export default function FiszkiWyswietlanie({ fiszki, setFiszki }: FiszkiWyswietlanieProp) {
  const Stack = createNativeStackNavigator();
  const [historia, setHistoria] = useState<string[]>([]);

  const {
    indexFiszek,
    jakiZestawDoWyswietlenia,
    switchTaFiszkaJuzByla,
    setSwitchTaFiszkaJuzByla,
    indexX,
    setIndexX,
    opcjeJezyj,
    back,
    setBack,
    front,
    setFront,
    wybranaFiszka,
    setWybranaFiszka,
  } = useFiszki();

  //funkcja losująca z tabliczki uwzględniająca wagę, sumuje każdą wagę a później wybiera losując między 0 a suma wszystkich wag i wypycha pierwsze zadanie które jest większe od wylosowanej liczby
  useEffect(() => {
    //wybieranie fiszki na podstawie wagi:
    if (fiszki[indexFiszek] == undefined) return;
    let sum = 0;
    let accumulatedArray = [];

    for (let n of fiszki[indexFiszek].lista) {
      sum += n.waga;
      accumulatedArray.push(sum);
    }

    const rand = Math.random() * sum;
    const index = accumulatedArray.findIndex((value) => rand < value);

    //sprawdzanie historii
    if (fiszki[indexFiszek].lista.length <= 5) {
      //jeżeli fiszek jest mniej niż 5 zwracaj wylosowaną fiszkę
      setIndexX(index);
      setWybranaFiszka(fiszki[indexFiszek].lista[index]);
    } else if (historia.includes(fiszki[indexFiszek].lista[index].polski)) {
      //fiszka sie powtarza losowanie nowej fiszki:
      setSwitchTaFiszkaJuzByla((prev) => !prev);
      return;
    } else {
      //fiszki nie ma w historii:
      //puszowanie wyboru do historii
      setHistoria((prev) => {
        const noMutable = [...prev];
        if (noMutable.length >= 5) {
          noMutable.shift();
        }

        const never = fiszki[indexFiszek].lista[index].polski;
        noMutable.push(never);

        return noMutable;
      });
      setIndexX(index);
      setWybranaFiszka(fiszki[indexFiszek].lista[index]);
    }

    const konFlip = Math.floor(Math.random() * 2);

    if (opcjeJezyj == "PL") {
      setFront(() => {
        return wybranaFiszka?.angielski;
      });
      setBack(() => {
        return wybranaFiszka?.polski;
      });
    } else if (opcjeJezyj == "EN") {
      setBack(() => {
        return wybranaFiszka?.angielski;
      });
      setFront(() => {
        return wybranaFiszka?.polski;
      });
    } else {
      if (konFlip == 0) {
        setFront(() => {
          return wybranaFiszka?.angielski;
        });
        setBack(() => {
          return wybranaFiszka?.polski;
        });
      } else {
        setBack(() => {
          return wybranaFiszka?.angielski;
        });
        setFront(() => {
          return wybranaFiszka?.polski;
        });
      }
    }
    if (wybranaFiszka?.polski == "") {
      setSwitchTaFiszkaJuzByla((prev) => !prev);
    }
  }, [indexFiszek, switchTaFiszkaJuzByla]);

  return (
    <Stack.Navigator screenOptions={{ headerTintColor: "#9b6b46" }} initialRouteName="Moje Fiszki">
      <Stack.Screen
        name="Moje Fiszki"
        options={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#9b6b46",
          },
        }}
        component={MojeFiszkiEkranMain}
      />
      <Stack.Screen
        name="wyswietlanie"
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: "#9b6b46",
          headerStyle: {
            backgroundColor: "#9b6b46",
          },
        }}
        component={WyswietlanieKart}
      />
    </Stack.Navigator>
  );
}
