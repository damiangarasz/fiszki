import { fiszki, setFiszki } from "../../context/FiszkiContextTypes.ts";

export type Ogolne = { data: number[]; dzienTygodnia: number; slowka: string[] }[];

export type ObjType = {
  day: number;
  data: number;
  month: number;
  year: number;
  pelnaData: number[];
};

export type dodawanieStatArg = {
  setOgolneStatystyki: React.Dispatch<React.SetStateAction<Ogolne>>;
  angielskiText: string;
  dataObj: ObjType;
};

export type zmianaZnamNieZnamParam = {
  param: number;
  setFiszki: setFiszki;
  fiszki: fiszki;
  indexFiszek: number;
  indexX: number;
};

export type losowanieIndexuFiszkiProp = {
  fiszki: fiszki;
  indexFiszek: number;
  randomNum: number;
};

export type sprawdzanieHistoriiFiszekProp = {
  historia: string[];
  fiszki: fiszki;
  indexFiszek: number;
  index: number;
};

export type wybranieFiszkiNaPodstawieHistoriiProp = {
  fiszki: fiszki;
  indexFiszek: number;
  setIndexX: React.Dispatch<number>;
  setWybranaFiszka: React.Dispatch<{
    id: string;
    polski: string;
    angielski: string;
    kontekst: string;
  }>;
  setHistoria: React.Dispatch<React.SetStateAction<string[]>>;
  setSwitchTaFiszkaJuzByla: React.Dispatch<React.SetStateAction<boolean>>;
  sprHistorii: boolean;
  index: number;
};

export type wypelnianieKartSlowamiParam = {
  randomNum: number;
  opcjeJezyj: string;
  setFront: React.Dispatch<React.SetStateAction<string>>;
  setBack: React.Dispatch<React.SetStateAction<string>>;
  wybranaFiszka: { id: string; polski: string; angielski: string; kontekst: string };
  setTriggerReload: React.Dispatch<React.SetStateAction<boolean>>;
};
