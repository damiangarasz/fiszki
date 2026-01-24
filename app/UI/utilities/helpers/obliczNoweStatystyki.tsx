import { Ogolne } from "../utilitiesTypes";

export default function obliczNoweStatystyki(
  prev: Ogolne,
  angielskiText: string,
  dataTeraz: { day: number; data: number; month: number; year: number; pelnaData: number[] }
) {
  const { day, data, month, year, pelnaData } = dataTeraz;

  const findIndex = prev.findIndex(
    (element) => element.data[0] == data && element.data[1] == month && element.data[2] == year
  );

  if (findIndex != -1) {
    const arrOfObj = prev.map((obj, index: number) => {
      if (findIndex == index) {
        return { ...obj, slowka: [...obj.slowka, angielskiText] };
      } else {
        return obj;
      }
    });
    return arrOfObj;
  } else if (prev.length >= 30) {
    const sliced = prev.slice(1);

    return [...sliced, { data: pelnaData, dzienTygodnia: day, slowka: [angielskiText] }];
  } else {
    return [...prev, { data: pelnaData, dzienTygodnia: day, slowka: [angielskiText] }];
  }
}
