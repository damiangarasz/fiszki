import { losowanieIndexuFiszkiProp } from "../utilitiesTypes.ts";

//PURE
export default function losowanieIndexuFiszki({
  fiszki,
  indexFiszek,
  randomNum,
}: losowanieIndexuFiszkiProp) {
  if (!fiszki || fiszki[indexFiszek] == undefined) return 0;
  let sum = 0;
  let accumulatedArray = [];

  for (let n of fiszki[indexFiszek].lista) {
    sum += n.waga;
    accumulatedArray.push(sum);
  }

  const rand = randomNum * sum;
  const index = accumulatedArray.findIndex((value) => rand < value);
  return index;
}
