import { wypelnianieKartSlowamiParam } from "../utilitiesTypes.ts";

export function wypelnianieKartSlowami({
  randomNum,
  opcjeJezyj,
  setFront,
  setBack,
  wybranaFiszka,
  setTriggerReload,
}: wypelnianieKartSlowamiParam) {
  const konFlip = Math.floor(randomNum * 2);

  if (!randomNum || !opcjeJezyj) return;
  if (wybranaFiszka?.polski == "" || wybranaFiszka?.polski == undefined) {
    setTriggerReload((prev: boolean) => !prev);
  }

  if (opcjeJezyj == "PL") {
    setFront(wybranaFiszka?.angielski);
    setBack(wybranaFiszka?.polski);
  } else if (opcjeJezyj == "EN") {
    setBack(wybranaFiszka?.angielski);
    setFront(wybranaFiszka?.polski);
  } else {
    if (konFlip == 0) {
      setFront(wybranaFiszka?.angielski);
      setBack(wybranaFiszka?.polski);
    } else {
      setBack(wybranaFiszka?.angielski);
      setFront(wybranaFiszka?.polski);
    }
  }
}
