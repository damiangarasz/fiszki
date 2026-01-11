import { useFiszki } from "@/app/context/FiszkiContext";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { bestDayOfTheWeek, lastSevenDays, month } from "./useTypes.ts";

export default function useStatystyki() {
  const { ogolneStatystyki } = useFiszki();

  const [lastSevenDays, setLastSevenDays] = useState<lastSevenDays>([]);
  const [bestDayOfTheWeek, setBestDayOfTheWeek] = useState<bestDayOfTheWeek>([]);
  const [month, setMonth] = useState<month>([]);

  const lastSevenDaysFn = useCallback(() => {
    const dayOfTheWeek = ["Ndz", "Pn", "Wt", "Sr", "Cz", "Pt", "So"];
    setLastSevenDays(() => {
      // populuje tablicę datami, z ostatnich 7 dni w formacie [dzien, miesiąc, dzień tygodnia od 0-6]
      const lastSevenDays = [];
      const data = new Date();
      for (let n = 0; n < 7; n++) {
        //romie kopię żeby nie mutowac danych
        const tempDate = new Date(data);
        tempDate.setDate(tempDate.getDate() - n);
        lastSevenDays.push([tempDate.getDate(), tempDate.getMonth(), tempDate.getDay()]);
      }

      const slicedData = ogolneStatystyki.slice(-7);
      //tu muszę przeszukać po całej tablicy dni i każdy dzień porównać z całą tablicą dni w memory, każdy dzień z każdym, jeśli pasuje to obiekt pełen, jeżeli nie ma dopasowania to oddaje obiekt z 0 przerobionymi fiszkami
      const finalArr = lastSevenDays.map((day, index) => {
        const temp = slicedData.map((dayInMemory) => {
          if (day[0] == dayInMemory.data[0] && day[1] == dayInMemory.data[1]) {
            return {
              value: dayInMemory.slowka.length,
              label: dayOfTheWeek[dayInMemory.dzienTygodnia],
            };
          } else {
            return { value: 0, label: dayOfTheWeek[day[2]] };
          }
        });
        return temp;
      });

      return finalArr.flat().reverse();
    });
  }, []);
  const bestDayOfTheWeekFn = useCallback(() => {}, []);
  const monthFn = useCallback(() => {}, []);

  useFocusEffect(
    useCallback(() => {
      lastSevenDaysFn();
      bestDayOfTheWeekFn();
      monthFn();
    }, [lastSevenDaysFn, bestDayOfTheWeekFn, monthFn])
  );

  return { lastSevenDays, bestDayOfTheWeek, month };
}
