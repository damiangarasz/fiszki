type Ogolne = { data: number[]; dzienTygodnia: number; slowka: string[] }[];

export type dodawanieStatArg = {
  setOgolneStatystyki: React.Dispatch<React.SetStateAction<Ogolne>>;
  angielskiText: string;
  num: number;
};
