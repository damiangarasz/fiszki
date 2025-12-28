type fiszki = {
  key: string;
  lista: { polski: string; angielski: string; kontekst: string; waga: number }[];
}[];

type setFiszki = React.Dispatch<
  React.SetStateAction<
    {
      key: string;
      lista: { polski: string; angielski: string; kontekst: string; waga: number }[];
    }[]
  >
>;

export interface FiszkiContextType {
  fiszki: fiszki;
  setFiszki: setFiszki;
  setJakiZestawDoWyswietlenia: React.Dispatch<string>;
  jakiZestawDoWyswietlenia: string;
  setIndexFiszek: React.Dispatch<number>;
  indexFiszek: number;
  switchTaFiszkaJuzByla: boolean;
  setSwitchTaFiszkaJuzByla: React.Dispatch<React.SetStateAction<boolean>>;
  indexX: number;
  setIndexX: React.Dispatch<number>;
  opcjeJezyj: string;
  setOpcjeJezyk: React.Dispatch<string>;
  back: string;
  setBack: React.Dispatch<React.SetStateAction<string>>;
  front: string;
  setFront: React.Dispatch<React.SetStateAction<string>>;
  wybranaFiszka: { polski: string; angielski: string; kontekst: string };
  setWybranaFiszka: React.Dispatch<{ polski: string; angielski: string; kontekst: string }>;
  fiszkaDoEdycji: number;
  setFiszkaDoEdycji: React.Dispatch<React.SetStateAction<number>>;
  dadajGrupeFiszek: boolean;
  setDodajGrupeFiszek: React.Dispatch<boolean>;
  dodajFiszke: boolean;
  setDodajFiszke: React.Dispatch<boolean>;
}
