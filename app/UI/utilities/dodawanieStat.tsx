import { dodawanieStatArg } from "./utilitiesTypes.ts";

export function dodawanieStat({ setOgolneStatystyki, angielskiText, num }: dodawanieStatArg) {
  const date = new Date();
  const day = date.getDay();
  const data = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const pelnaData = [data, month, year];

  setOgolneStatystyki((prev) => {
    const findIndex = prev.findIndex(
      (element) => element.data[0] == data && element.data[1] == month && element.data[2] == year
    );

    if (findIndex != -1) {
      const arrOfObj = prev.map((obj, index) => {
        if (findIndex == index) {
          return { ...obj, slowka: [...obj.slowka, angielskiText] };
        } else {
          return obj;
        }
      });
      return arrOfObj;
    } else {
      if (prev.length >= 30) {
        const sliced = prev.slice(1);

        return [...sliced, { data: pelnaData, dzienTygodnia: day, slowka: [angielskiText] }];
      } else {
        return [...prev, { data: pelnaData, dzienTygodnia: day, slowka: [angielskiText] }];
      }
    }
  });

  console.log(date);
}
