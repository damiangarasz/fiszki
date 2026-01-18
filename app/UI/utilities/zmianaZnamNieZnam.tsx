import { zmianaZnamNieZnamParam } from "./utilitiesTypes.ts";

export default function zamianaZnamNieZnam({
  param,
  setFiszki,
  fiszki,
  indexFiszek,
  indexX,
}: zmianaZnamNieZnamParam) {
  //GUARD
  const validParam = [0, 1, 2];
  if (!validParam.includes(param)) {
    console.warn(`[zmianaZnamNieZnam] Próba ustawienia błędnego statusu: ${param}`);
    return;
  } else if (typeof setFiszki != "function") {
    console.error("BŁĄD: Przekazano coś, co nie jest funkcją!");
    return;
  } else if (indexFiszek > fiszki.length - 1) {
    console.error("Nie ma takiego zestawu fiszek");
    return;
  } else if (indexX > fiszki[indexFiszek].lista.length - 1) {
    console.error("Nie ma takiej fiszki");
    return;
  }

  setFiszki((prev) => {
    const copyArr = prev.map((zestawFiszek, index) => {
      if (index != indexFiszek) {
        return zestawFiszek;
      } else {
        const mapaPoFiszkach = zestawFiszek.lista.map((fiszka, index) => {
          if (index != indexX) {
            return fiszka;
          } else {
            return {
              ...fiszka,
              znamNieZnam: param,
            };
          }
        });
        return { ...zestawFiszek, lista: mapaPoFiszkach };
      }
    });
    return copyArr;
  });
}
