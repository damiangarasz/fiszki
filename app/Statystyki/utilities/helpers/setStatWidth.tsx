export function setStatWidth(
  lista: {
    id: string;
    polski: string;
    angielski: string;
    kontekst: string;
    waga: number;
    znamNieZnam: number;
  }[]
) {
  let wiem = 0;
  let nieWiem = 0;
  let trocheWiem = 0;

  lista.map((item) => {
    if (item.znamNieZnam == 0) {
      nieWiem += 1;
    } else if (item.znamNieZnam == 1) {
      trocheWiem += 1;
    } else {
      wiem += 1;
    }
  });

  const calc = wiem + nieWiem + trocheWiem;

  wiem = (wiem / calc) * 100;
  nieWiem = (nieWiem / calc) * 100;
  trocheWiem = (trocheWiem / calc) * 100;
  return { wiem, nieWiem, trocheWiem };
}
