import { useState } from "react";
import { View } from "react-native";
import { propEdycja } from "../types.ts";

export default function Edycja({ fiszki, setFiszki, fiszkaDoEdycji }: propEdycja) {
  const [zapisNowejFiszki, setZapisNowejFiszki] = useState(false);
  const [polski, setPolski] = useState("");
  const [angielski, setAngielski] = useState("");
  const [kontekst, setKontekst] = useState("");

  return <View></View>;
}
