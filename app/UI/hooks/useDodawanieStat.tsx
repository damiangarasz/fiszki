import { useFiszki } from "@/app/context/FiszkiContext";
import { useEffect } from "react";

export function useDodawanieStat() {
  const { ogolneStatystyki, setOgolneStatystyki, angielskiText } = useFiszki();
  useEffect(() => {
    const data = new Date();
    const day = data.getDay();
    const month = data.getMonth();

    if (ogolneStatystyki.length == 0) {
      setOgolneStatystyki((prev) => {
        return [...prev, { value: 1, dzien: day, slowka: [angielskiText] }];
      });
    } else {
      //TODO tutaj jestem lol
    }
    console.log(data.getDate());
  }, []);
}
