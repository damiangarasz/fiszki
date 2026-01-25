import obliczNoweStatystyki from "../helpers/obliczNoweStatystyki.tsx";
import { dodawanieStatArg } from "../utilitiesTypes.ts";

export function dodawanieStat({ setOgolneStatystyki, angielskiText, dataObj }: dodawanieStatArg) {
  if (dataObj == undefined || dataObj?.data == undefined) return;

  setOgolneStatystyki((prev) => {
    return obliczNoweStatystyki(prev, angielskiText, dataObj);
  });
}
