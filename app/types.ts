import { StackNavigationProp } from "@react-navigation/stack";

export type fiszki = {
  key: string;
  lista: { polski: string; angielski: string; kontekst: string; waga: number; znamNieZnam: number }[];
}[];

export type setFiszki = React.Dispatch<
  React.SetStateAction<
    {
      key: string;
      lista: { polski: string; angielski: string; kontekst: string; waga: number }[];
    }[]
  >
>;

export type propFiszkiEdycja = {
  fiszki: fiszki;
  setFiszki: setFiszki;
  setFiszkaDoEdycji: React.Dispatch<React.SetStateAction<number>>;
  fiszkaDoEdycji: number;
};

export type propEdycja = {
  navigation: MainScreenNavigationProp;
  fiszki: fiszki;
  setFiszki: setFiszki;
  fiszkaDoEdycji: number;
};

type StackParamList = {
  main: undefined;
  edycja: undefined;
};
type StackParamListMojeFiszki = {
  main: undefined;
  wyswietlanie: undefined;
};

export type MainScreenNavigationProp = StackNavigationProp<StackParamList, "main">;
export type MojeFiszkiEkranProp = StackNavigationProp<StackParamListMojeFiszki, "wyswietlanie">;

export interface MainScreenProps {
  navigation: MainScreenNavigationProp;
  fiszki: fiszki;
  setFiszki: setFiszki;
}

export type DodajGrupeFiszekProp = {
  navigation: MainScreenNavigationProp;
  fiszki: fiszki;
  setFiszki: setFiszki;
  setDodajGrupeFiszek: React.Dispatch<boolean>;
  setFiszkaDoEdycji: React.Dispatch<React.SetStateAction<number>>;
};

export type DodajFiszkeEkranProp = {
  setDodajFiszke: React.Dispatch<boolean>;
  setFiszki: setFiszki;
  fiszki: fiszki;
  fiszkaDoEdycji: number;
};

export type EdycjaScreenProps = {
  navigation: MainScreenNavigationProp;
  fiszki: fiszki;
  setFiszki: setFiszki;
  fiszkaDoEdycji: number;
};

export type FiszkiWyswietlanieProp = {
  fiszki: fiszki;
  setFiszki: setFiszki;
};

export type MojeFiszkiEkranMainProp = { navigation: MojeFiszkiEkranProp };
