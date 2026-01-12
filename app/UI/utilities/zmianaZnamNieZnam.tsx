import { zmianaZnamNieZnamParam } from "./utilitiesTypes.ts";

export default function zamianaZnamNieZnam({
  param,
  setFiszki,
  indexFiszek,
  indexX,
}: zmianaZnamNieZnamParam) {
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
