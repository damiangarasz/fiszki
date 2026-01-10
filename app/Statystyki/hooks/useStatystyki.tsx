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
      const day = data.getDate();
      for (let n = 0; n < 7; n++) {
        data.setDate(day - n);
        lastSevenDays.push([data.getDate(), data.getMonth(), data.getDay()]);
      }

      //TODO tu jestem
      const slicedData = ogolneStatystyki.slice(-7);
      //tu muszę pzreszukać po całej tablicy dni i każdy dzień porównać z całą tablicą dni w memory, każdy dzień z każdym, jeśli pasuje to obiekt pełen, jeżeli nie ma dopasowania to oddaje obiekt z 0 przerobionymi fiszkami
      const finalArr = lastSevenDays.map((day, index) => {
        const temp = slicedData.map((dayInMemory) => {
          if (day[0] == dayInMemory.data[0] && day[1] == dayInMemory.data[1]) {
            return {
              ilePrzerobionychFiszek: dayInMemory.slowka.length,
              dzienTygodnia: dayOfTheWeek[dayInMemory.dzienTygodnia],
            };
          } else {
            return { ilePrzerobionychFiszek: 0, dzienTygodnia: dayOfTheWeek[day[2]] };
          }
        });
        return temp;
      });

      return finalArr;
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
