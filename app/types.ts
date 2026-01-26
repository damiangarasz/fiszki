import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { fiszki, setFiszki } from "./context/FiszkiContextTypes";

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

export type RootTabParamList = {
  "Moje Fiszki": undefined;
  Edycja: undefined;
  Statsy: undefined;
};


export type BottomTabNavigation = BottomTabNavigationProp<RootTabParamList>;
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
