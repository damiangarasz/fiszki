import { StackNavigationProp } from "@react-navigation/stack";

export type fiszki = {
  key: string;
  lista: { polski: string; angielski: string; kontekst: string }[];
}[];

export type setFiszki = React.Dispatch<
  React.SetStateAction<
    {
      key: string;
      lista: { polski: string; angielski: string; kontekst: string }[];
    }[]
  >
>;

export type propFiszkiEdycja = {
  fiszki: fiszki;
  setFiszki: setFiszki;
};

export type propEdycja = {
  fiszki: fiszki;
  setFiszki: setFiszki;
  fiszkaDoEdycji: number;
};

type StackParamList = {
  main: undefined;
  edycja: undefined;
};

export type MainScreenNavigationProp = StackNavigationProp<StackParamList, "main">;
