import { StackNavigationProp } from "@react-navigation/stack";

type StackParamList = {
  Edycja: undefined;
  edycja: undefined;
};
export type MainScreenNavigationProp = {
  navigation: StackNavigationProp<StackParamList, "Edycja">;
};
