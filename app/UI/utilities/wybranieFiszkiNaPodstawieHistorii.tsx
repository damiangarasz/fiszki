export function aktualizujHistorie() {
  //TODO jestem tutaj
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
}) {
  if (fiszki[indexFiszek].lista.length <= 5) {
    setIndexX(index);
    setWybranaFiszka(fiszki[indexFiszek].lista[index]);
  } else if (sprHistorii == false) {
    setHistoria((prev) => {
      const noMutable = [...prev];
      if (noMutable.length >= 5) {
        noMutable.shift();
      }

      const never = fiszki[indexFiszek].lista[index].polski;
      noMutable.push(never);

      return noMutable;
    });
    setIndexX(index);
    setWybranaFiszka(fiszki[indexFiszek].lista[index]);
  } else if (sprHistorii == true) {
    setSwitchTaFiszkaJuzByla((prev) => !prev);
    return;
  }
}
