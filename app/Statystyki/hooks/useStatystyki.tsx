import { useFiszki } from "@/app/context/FiszkiContext";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { statType } from "./useTypes.ts";
const dayOfTheWeek = ["Ndz", "Pn", "Wt", "Sr", "Cz", "Pt", "So"];

export default function useStatystyki() {
  const { ogolneStatystyki } = useFiszki();

  const [lastSevenDays, setLastSevenDays] = useState<statType>([]);
  const [bestDayOfTheWeek, setBestDayOfTheWeek] = useState<statType>([]);
  const [month, setMonth] = useState<{ value: number }[]>([]);

  const lastSevenDaysFn = useCallback(() => {
    // populuje tablicę datami, z ostatnich 7 dni w formacie [[dzien-miesiąc-rok], dzień tygodnia]
    const lastWeekDate: [string, number][] = [];
    const data = new Date();
    for (let n = 0; n < 7; n++) {
      //robie kopię żeby nie mutowac danych
      const tempDate = new Date(data);
      tempDate.setDate(tempDate.getDate() - n);
      lastWeekDate.push([
        `${tempDate.getDate()}-${tempDate.getMonth()}-${tempDate.getFullYear()}`,
        tempDate.getDay(),
      ]);
    }

    if (ogolneStatystyki.length == 0) return;
    const slicedData = ogolneStatystyki.slice(-7);
    console.log(JSON.stringify(slicedData, null, 2));
    const preparedData = slicedData.map((data): [string, number] => {
      return [`${data.data[0]}-${data.data[1]}-${data.data[2]}`, data.slowka.length];
    });

    const finalArr = lastWeekDate.map((day) => {
      const ifMatch = preparedData.find((el) => el[0] == day[0]);

      if (ifMatch) {
        return { value: ifMatch[1], label: dayOfTheWeek[day[1]] };
      } else {
        return { value: 0, label: dayOfTheWeek[day[1]] };
      }
    });

    setLastSevenDays(finalArr.reverse());
  }, [ogolneStatystyki]);
  const bestDayOfTheWeekFn = useCallback(() => {
    if (ogolneStatystyki.length == 0) return;
    const extractionArray = ogolneStatystyki.map((obj) => {
      return [obj.dzienTygodnia, obj.slowka.length];
    });

    const arr = [0, 0, 0, 0, 0, 0, 0];
    for (let n = 0; n < extractionArray.length; n++) {
      arr[extractionArray[n][0]] += extractionArray[n][1];
    }

    const arrObj = [];
    for (let i = 0; i < arr.length; i++) {
      arrObj.push({ value: arr[i], label: dayOfTheWeek[i] });
    }

    setBestDayOfTheWeek(arrObj);
  }, [ogolneStatystyki]);

  const monthFn = useCallback(() => {
    if (ogolneStatystyki.length == 0) return;
    const sliced = ogolneStatystyki.slice(-30);

    const data = new Date();
    //populuje array stringami dat w formacie "dzien-miesiąc"
    const lastMonthData: string[] = [];
    for (let n = 0; n < 30; n++) {
      const tempData = new Date(data);
      tempData.setDate(tempData.getDate() - n);
      lastMonthData.push(`${tempData.getDate()}-${tempData.getMonth()}-${tempData.getFullYear()}`);
    }

    //mapuje po 30 rekordach z pamięci
    const dataValueArr = sliced.map((data): [string, number] => {
      const dataString = `${data.data[0]}-${data.data[1]}-${data.data[2]}`;
      return [dataString, data.slowka.length];
    });

    const finalArr = lastMonthData.reverse().map((data): { value: number } => {
      const isData = dataValueArr.find((element) => element[0] == data);

      if (isData) {
        return { value: isData[1] };
      } else {
        return { value: 0 };
      }
    });
    setMonth(finalArr);
  }, [ogolneStatystyki]);

  useFocusEffect(
    useCallback(() => {
      lastSevenDaysFn();
      bestDayOfTheWeekFn();
      monthFn();
    }, [lastSevenDaysFn, bestDayOfTheWeekFn, monthFn])
  );

  return { lastSevenDays, bestDayOfTheWeek, month };
}
