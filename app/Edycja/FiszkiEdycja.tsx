import { Text, View } from "react-native";
import { propFiszkiEdycja } from "../types.ts";

export default function FiszkiEdycja({ fiszki, setFiszki }: propFiszkiEdycja) {
  return (
    <View>
      {fiszki.map((element, index) => {
        const key = Object.keys(element)[0] + index;
        return (
          <View key={key}>
            <Text>{Object.keys(element)}</Text>
          </View>
        );
      })}
    </View>
  );
}
