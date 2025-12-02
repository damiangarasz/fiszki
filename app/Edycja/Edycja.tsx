import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { propEdycja } from "../types.ts";

export default function Edycja({ fiszki, setFiszki, fiszkaDoEdycji }: propEdycja) {
  const [zapisNowejFiszki, setZapisNowejFiszki] = useState(false);
  const [polski, setPolski] = useState("");
  const [angielski, setAngielski] = useState("");
  const [kontekst, setKontekst] = useState("");

  function wyslij() {
    if (polski.length > 1 && angielski.length > 1) {
      setFiszki((prev) => {
        if (fiszkaDoEdycji === -1) return prev;

        const copy = [...prev];
        const key = Object.keys(copy[fiszkaDoEdycji])[0];
        const obj = { polski: polski, angielski: angielski, kontekst: kontekst };
        copy[fiszkaDoEdycji][key].push(obj);
        return copy;
      });
    }
  }

  function dodanieFiszka() {
    return (
      <View className="w-[75%] h-[75%] m-auto bg-slate-700">
        <Text>Polski:</Text>
        <TextInput
          className="h-5"
          maxLength={15}
          onChangeText={setPolski}
          autoCapitalize={"none"}
        />
        <Text>Angielski:</Text>
        <TextInput maxLength={15} onChangeText={setAngielski} autoCapitalize={"none"} />
        <Text>Kontekst:</Text>
        <TextInput
          maxLength={160}
          onChangeText={setKontekst}
          multiline
          numberOfLines={4}
          autoCapitalize={"none"}
        />
        <View className="flex-row gap-5">
          <Pressable
            onPress={() => {
              wyslij();
            }}
          >
            <Text>Wyślij</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setZapisNowejFiszki(false);
            }}
          >
            <Text>Anuluj</Text>
          </Pressable>
        </View>
      </View>
    );
  }
  return (
    <View>
      <Pressable
        onPress={() => {
          setZapisNowejFiszki(true);
          console.log("dup");
        }}
      >
        <Text>Dodaj nowe</Text>
      </Pressable>

      {zapisNowejFiszki ? dodanieFiszka() : <></>}

      {fiszki[fiszkaDoEdycji] &&
        Object.values(fiszki[fiszkaDoEdycji])[0]?.map((element, index) => {
          const key = Object.keys(element)[0] + index;
          return (
            <View key={key} className="flex flex-row gap-3">
              <Text>{element.polski}</Text>
              <Text>{element.angielski}</Text>
              <Text>{element.kontekst}</Text>
              <Pressable>
                <Text>Edycja</Text>
              </Pressable>
            </View>
          );
        })}
    </View>
  );
}
