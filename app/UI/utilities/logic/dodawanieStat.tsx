import obliczNoweStatystyki from "../helpers/obliczNoweStatystyki.tsx";
import { dodawanieStatArg } from "../utilitiesTypes.ts";

export function dodawanieDaty() {
  const date = new Date();
  const day = date.getDay();
  const data = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const pelnaData = [data, month, year];

  return { day, data, month, year, pelnaData };
}

export function dodawanieStat({ setOgolneStatystyki, angielskiText }: dodawanieStatArg) {
  const dataTeraz = dodawanieDaty();

  setOgolneStatystyki((prev) => {
    return obliczNoweStatystyki(prev, angielskiText, dataTeraz);
  });
}
