import {setFiszki} from "../../context/FiszkiContextTypes.ts"

type Ogolne = { data: number[]; dzienTygodnia: number; slowka: string[] }[];

export type dodawanieStatArg = {
  setOgolneStatystyki: React.Dispatch<React.SetStateAction<Ogolne>>;
  angielskiText: string;
  num: number;
};

export type zmianaZnamNieZnamParam = {
  param: number;
  setFiszki: setFiszki;
  indexFiszek: number;
  indexX: number; 
};
