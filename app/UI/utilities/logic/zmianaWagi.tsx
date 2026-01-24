export default function zmianaWagi() {
  const fiszkiArrCopy = [...fiszki];
  if (fiszkiArrCopy.length == 0) return;
  if (arg == "znam") {
    if (fiszkiArrCopy[indexFiszek].lista[indexX].waga > 0.5) {
      setFiszki((prev) => {
        const prevArr = [...prev];
        prevArr[indexFiszek].lista[indexX].waga =
          Math.round((prevArr[indexFiszek].lista[indexX].waga - 0.5) * 100) / 100;
        return prevArr;
      });
    } else if (
      fiszkiArrCopy[indexFiszek].lista[indexX].waga <= 0.5 &&
      fiszkiArrCopy[indexFiszek].lista[indexX].waga > 0.1
    ) {
      setFiszki((prev) => {
        const prevArr = [...prev];
        prevArr[indexFiszek].lista[indexX].waga =
          Math.round((prevArr[indexFiszek].lista[indexX].waga - 0.1) * 100) / 100;
        return prevArr;
      });
    } else if (fiszkiArrCopy[indexFiszek].lista[indexX].waga <= 0.1) {
    }
  } else if (arg == "nieZnam") {
    if (fiszkiArrCopy[indexFiszek].lista[indexX].waga < 1.5) {
      setFiszki((prev) => {
        const prevArr = [...prev];
        prevArr[indexFiszek].lista[indexX].waga =
          Math.round((prevArr[indexFiszek].lista[indexX].waga + 0.5) * 100) / 100;
        return prevArr;
      });
    } else if (
      fiszkiArrCopy[indexFiszek].lista[indexX].waga >= 1.5 &&
      fiszkiArrCopy[indexFiszek].lista[indexX].waga < 1.9
    ) {
      setFiszki((prev) => {
        const prevArr = [...prev];
        prevArr[indexFiszek].lista[indexX].waga =
          Math.round((prevArr[indexFiszek].lista[indexX].waga + 0.1) * 100) / 100;
        return prevArr;
      });
    } else if (fiszkiArrCopy[indexFiszek].lista[indexX].waga >= 1.9) {
    }
  } else {
    setFiszki((prev) => {
      const prevArr = [...prev];
      prevArr[indexFiszek].lista[indexX].waga = 1;

      return prevArr;
    });
  }
}
