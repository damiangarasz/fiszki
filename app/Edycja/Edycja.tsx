import { Text, View } from "react-native";
import { propEdycja } from "../types.ts";

export default function Edycja({ fiszki, setFiszki, fiszkaDoEdycji }: propEdycja) {
  return (
    <View>
      <Text>{fiszkaDoEdycji}</Text>
    </View>
  );
}
