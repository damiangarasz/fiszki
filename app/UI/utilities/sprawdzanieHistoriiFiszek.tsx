import { sprawdzanieHistoriiFiszekProp } from "./utilitiesTypes.ts";

export default function sprawdzanieHistoriiFiszek({
  historia,
  fiszki,
  indexFiszek,
  index,
}: sprawdzanieHistoriiFiszekProp) {
  //Jeżeli nie ma fiszki w historii oddaje false
  if (historia.includes(fiszki[indexFiszek].lista[index].polski)) {
    return true;
  } else {
    return false;
  }
}
