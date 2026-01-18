export type fiszki = {
  key: string;
  lista: {
    id: string;
    polski: string;
    angielski: string;
    kontekst: string;
    waga: number;
    znamNieZnam: number;
  }[];
}[];

export type setFiszki = React.Dispatch<
  React.SetStateAction<
    {
      key: string;
      lista: {
        id: string;
        polski: string;
        angielski: string;
        kontekst: string;
        waga: number;
        znamNieZnam: number;
      }[];
    }[]
  >
>;

export type Ogolne = { data: number[]; dzienTygodnia: number; slowka: string[] }[];

export interface FiszkiContextType {
  polskiText: string;
  angielskiText: string;
  kontekstText: string;
  setPolskiText: React.Dispatch<React.SetStateAction<string>>;
  setAngielskiText: React.Dispatch<React.SetStateAction<string>>;
  setKontekstText: React.Dispatch<React.SetStateAction<string>>;
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
  wybranaFiszka: { id: string; polski: string; angielski: string; kontekst: string };
  setWybranaFiszka: React.Dispatch<{
    id: string;
    polski: string;
    angielski: string;
    kontekst: string;
  }>;
  fiszkaDoEdycji: number;
  setFiszkaDoEdycji: React.Dispatch<React.SetStateAction<number>>;
  dadajGrupeFiszek: boolean;
  setDodajGrupeFiszek: React.Dispatch<boolean>;
  dodajFiszke: boolean;
  setDodajFiszke: React.Dispatch<boolean>;
  idEdytowaniejFiszki: string;
  setIdEdytowanejFiszki: React.Dispatch<React.SetStateAction<string>>;
  ogolneStatystyki: Ogolne;
  setOgolneStatystyki: React.Dispatch<React.SetStateAction<Ogolne>>;
}
