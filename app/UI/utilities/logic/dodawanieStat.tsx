import obliczNoweStatystyki from "../helpers/obliczNoweStatystyki.tsx";
import { dodawanieStatArg } from "../utilitiesTypes.ts";

export function dodawanieStat({ setOgolneStatystyki, ang, dataObj }: dodawanieStatArg) {
  if (dataObj == undefined || dataObj?.data == undefined) return;

  setOgolneStatystyki((prev) => {
    return obliczNoweStatystyki(prev, ang, dataObj);
  });
}
