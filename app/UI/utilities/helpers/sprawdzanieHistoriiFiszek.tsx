import { sprawdzanieHistoriiFiszekProp } from "../utilitiesTypes.ts";

export default function sprawdzanieHistoriiFiszek({
  historia,
  fiszki,
  indexFiszek,
  index,
}: sprawdzanieHistoriiFiszekProp) {
  //GUARD
  if (!fiszki?.[indexFiszek]?.lista?.[index]?.polski) {
    return false;
  }

  if (historia.includes(fiszki[indexFiszek].lista[index].polski)) {
    //Jeżeli nie ma fiszki w historii oddaje false
    return true;
  } else {
    return false;
  }
}
