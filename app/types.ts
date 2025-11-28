import { StackNavigationProp } from "@react-navigation/stack";

export type fiszki = {
  [key: string]: {
    polski: string;
    angielski: string;
    konteks: string;
  };
}[];

export type setFiszki = React.Dispatch<
  React.SetStateAction<
    {
      [key: string]: {
        polski: string;
        angielski: string;
        konteks: string;
      };
    }[]
  >
>;

export type propFiszkiEdycja = {
  fiszki: fiszki;
  setFiszki: setFiszki;
};

type StackParamList = {
  main: undefined;
  edycja: undefined;
};

export type MainScreenNavigationProp = StackNavigationProp<StackParamList, "main">;
