import { wybranieFiszkiNaPodstawieHistoriiProp } from "./utilitiesTypes.ts";

export function aktualizujHistorie(prev: string[], slowko: string) {
  const noMutable = [...prev];
  if (noMutable.length >= 5) {
    noMutable.shift();
  }

  noMutable.push(slowko);
  return noMutable;
}

export default function wybranieFiszkiNaPodstawieHistorii({
  fiszki,
  indexFiszek,
  setIndexX,
  setWybranaFiszka,
  setHistoria,
  setSwitchTaFiszkaJuzByla,
  sprHistorii,
  index,
}: wybranieFiszkiNaPodstawieHistoriiProp) {
  if (fiszki[indexFiszek].lista.length <= 5) {
    setIndexX(index);
    setWybranaFiszka(fiszki[indexFiszek].lista[index]);
  } else if (sprHistorii == false) {
    setHistoria((prev: string[]) => {
      const slowko = fiszki[indexFiszek].lista[index].polski;
      const tablica = aktualizujHistorie(prev, slowko);

      return tablica;
    });
    setIndexX(index);
    setWybranaFiszka(fiszki[indexFiszek].lista[index]);
  } else if (sprHistorii == true) {
    setSwitchTaFiszkaJuzByla((prev) => !prev);
    return;
  }
}
