import { Pressable, Text, View } from "react-native";
import { propEdycja } from "../types.ts";

export default function Edycja({ fiszki, setFiszki, fiszkaDoEdycji }: propEdycja) {
  return (
    <View>
      <Pressable>
        <Text>Dodaj nowe</Text>
      </Pressable>
      {Object.values(fiszki[fiszkaDoEdycji])[0].map((element, index) => {
        console.log(element);
        const key = Object.keys(element)[0] + index;
        return (
          <View key={key}>
            <Text>{}</Text>
          </View>
        );
      })}
    </View>
  );
}
