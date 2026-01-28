import { StackNavigationProp } from "@react-navigation/stack";

type StackParamList = {
  Edycja: undefined;
  edycja: undefined;
};
export type MainScreenNavigationProp = {
  navigation: StackNavigationProp<StackParamList, "Edycja">;
};

export type FiszkaMemo = {
  id: string;
  polski: string;
  angielski: string;
  kontekst: string;
  waga: number;
};

export type PropsMemo = {
  id: string;
  polski: string;
  angielski: string;
  kontekst: string;
  handleEdit: (
    id: string,
    index: number,
    polski: string,
    angielski: string,
    kontekst: string
  ) => void;
  index: number;
};

export type DaneFiszki = {
  polski: string;
  angielski: string;
  kontekst: string;
};

export type DodajFiszkeProps = {
  objdoedycji: DaneFiszki | {};
};
