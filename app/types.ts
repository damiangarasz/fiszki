import { StackNavigationProp } from "@react-navigation/stack";

export type fiszki = {
  [key: string]: {
    polski: string;
    angielski: string;
    konteks: string;
  }[];
}[];

export type setFiszki = React.Dispatch<
  React.SetStateAction<
    {
      [key: string]: {
        polski: string;
        angielski: string;
        konteks: string;
      }[];
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
  fiszkaDoEdycji: string;
};

type StackParamList = {
  main: undefined;
  edycja: undefined;
};

export type MainScreenNavigationProp = StackNavigationProp<StackParamList, "main">;
