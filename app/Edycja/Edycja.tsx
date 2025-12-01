import { Pressable, Text, View } from "react-native";
import { propEdycja } from "../types.ts";
import { useState } from "react";

export default function Edycja({ fiszki, setFiszki, fiszkaDoEdycji }: propEdycja) {

  const [switch, setSwitch] = useState(false)

  function dodanieFiszka(){
    return <> </>
  }
  return (
    <View>
      <Pressable onPress={()=>{
        setSwitch(true)
      }}>
        <Text>Dodaj nowe</Text>
      </Pressable>

      {dodanieFiszka()}
      {Object.values(fiszki[fiszkaDoEdycji])[0].map((element, index) => {
        const key = Object.keys(element)[0] + index;
        return (
          <View key={key} className="flex flex-row gap-3">
            <Text>{element.polski}</Text>
            <Text>{element.angielski}</Text>
            <Text>{element.konteks}</Text>
            <Pressable>
              <Text>Edycja</Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}
