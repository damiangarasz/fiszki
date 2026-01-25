import { fiszki, setFiszki } from "@/app/context/FiszkiContextTypes";

export default function zmianaWagi(
  setFiszki: setFiszki,
  indexFiszek: number,
  indexX: number,
  arg: string
) {
  if (
    !arg ||
    indexX == undefined ||
    indexFiszek == undefined ||
    arg == "" ||
    indexFiszek < 0 ||
    indexX < 0
  )
    return;

  setFiszki((prev) => {
    return zmianaWagiSetFiszki(prev, indexFiszek, indexX, arg);
  });
}

export function zmianaWagiSetFiszki(
  prev: fiszki,
  indexFiszek: number,
  indexX: number,
  arg: string
) {
  const objArray = prev.map((obj, index) => {
    if (index != indexFiszek) {
      return obj;
    } else {
      const zestawFiszek = obj.lista.map((fiszka, index) => {
        if (index != indexX) {
          return fiszka;
        } else {
          if (arg == "znam") {
            if (fiszka.waga > 5) {
              return { ...fiszka, waga: fiszka.waga - 2 };
            } else if (fiszka.waga <= 5 && fiszka.waga > 1) {
              return { ...fiszka, waga: fiszka.waga - 1 };
            } else {
              return { ...fiszka, waga: 1 };
            }
          } else if (arg == "nieZnam") {
            if (fiszka.waga >= 5 && fiszka.waga < 10) {
              return { ...fiszka, waga: fiszka.waga + 1 };
            } else if (fiszka.waga < 5) {
              return { ...fiszka, waga: fiszka.waga + 2 };
            } else {
              return { ...fiszka, waga: 10 };
            }
          } else {
            return { ...fiszka, waga: 5 };
          }
        }
      });
      return { ...obj, lista: zestawFiszek };
    }
  });

  return objArray;
}
