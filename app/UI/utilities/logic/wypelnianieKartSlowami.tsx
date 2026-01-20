import {wypelnianieKartSlowamiParam} from "../utilitiesTypes.ts"

export function wypelnianieKartSlowami({
  randomNum,
  opcjeJezyj,
  setFront,
  setBack,
  wybranaFiszka,
  setJeszczeRazLOL,
}: wypelnianieKartSlowamiParam) {
  const konFlip = Math.floor(randomNum * 2);

  if (opcjeJezyj == "PL") {
    setFront(() => {
      return wybranaFiszka?.angielski;
    });
    setBack(() => {
      return wybranaFiszka?.polski;
    });
  } else if (opcjeJezyj == "EN") {
    setBack(() => {
      return wybranaFiszka?.angielski;
    });
    setFront(() => {
      return wybranaFiszka?.polski;
    });
  } else {
    if (konFlip == 0) {
      setFront(() => {
        return wybranaFiszka?.angielski;
      });
      setBack(() => {
        return wybranaFiszka?.polski;
      });
    } else {
      setBack(() => {
        return wybranaFiszka?.angielski;
      });
      setFront(() => {
        return wybranaFiszka?.polski;
      });
    }
  }
  if (wybranaFiszka?.polski == "") {
    setJeszczeRazLOL((prev: boolean) => !prev);
  }
}
