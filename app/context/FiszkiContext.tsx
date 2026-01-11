import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { fiszki } from "../types";
import { FiszkiContextType, Ogolne } from "./FiszkiContextTypes";

const FiszkiContext = createContext<FiszkiContextType | undefined>(undefined);

export const FiszkiProvider = ({ children }: { children: React.ReactNode }) => {
  const [fiszki, setFiszki] = useState<fiszki>([]);
  const [fiszkaDoEdycji, setFiszkaDoEdycji] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // odczyt fiszek z perm memory i zaps w setFiszki
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("fiszki");
        if (jsonValue) {
          const parsed = JSON.parse(jsonValue);
          setFiszki(parsed);
        }
      } catch (e) {
        console.error("Error reading fiszki", e);
      } finally {
        setIsLoaded(true);
      }
    };
    getData();
  }, []);

  //zapis w perm memory
  useEffect(() => {
    if (!fiszki) return;
    if (!isLoaded) return;

    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(fiszki);
        await AsyncStorage.setItem("fiszki", jsonValue);
      } catch (e) {
        console.error("Error saving fiszki", e);
      }
    };
    storeData();
  }, [fiszki]);

  //UI
  const [switchTaFiszkaJuzByla, setSwitchTaFiszkaJuzByla] = useState(false);
  const [jakiZestawDoWyswietlenia, setJakiZestawDoWyswietlenia] = useState("");
  const [indexFiszek, setIndexFiszek] = useState(0);
  const [indexX, setIndexX] = useState(0);
  const [opcjeJezyj, setOpcjeJezyk] = useState("PL/EN");
  const [back, setBack] = useState("");
  const [front, setFront] = useState("");
  const [wybranaFiszka, setWybranaFiszka] = useState({
    id: "",
    polski: "",
    angielski: "",
    kontekst: "",
  });

  //KONIEC UI

  //EDYCJA
  const [dadajGrupeFiszek, setDodajGrupeFiszek] = useState(false);
  const [dodajFiszke, setDodajFiszke] = useState(false);
  const [polskiText, setPolskiText] = useState("");
  const [angielskiText, setAngielskiText] = useState("");
  const [kontekstText, setKontekstText] = useState("");

  //KONIEC EDYCJA

  //MEMO EDYTOWANIE FISZKI
  const [idEdytowaniejFiszki, setIdEdytowanejFiszki] = useState("");
  //KONIEC MEMO

  //STATYSTYKI

  const [ogolneStatystyki, setOgolneStatystyki] = useState<Ogolne>([
    { data: [11, 5, 2025], dzienTygodnia: 4, slowka: ["dagmara", "cep"] },
  ]);
  const [isLoadedStaty, setIsLoadedStaty] = useState(false);

  // odczyt statystyk z perm memory i zaps w setFiszki
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("staty");
        if (jsonValue) {
          const parsed = JSON.parse(jsonValue);
          setOgolneStatystyki(parsed);
        }
      } catch (e) {
        console.error("Error reading staty", e);
      } finally {
        setIsLoadedStaty(true);
      }
    };
    getData();
  }, []);

  //zapis statystyk w perm memory
  useEffect(() => {
    if (!ogolneStatystyki) return;
    if (!isLoadedStaty) return;

    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(ogolneStatystyki);
        await AsyncStorage.setItem("staty", jsonValue);
      } catch (e) {
        console.error("Error saving staty", e);
      }
    };
    storeData();
  }, [ogolneStatystyki]);

  //KONIEC STATYSTYKI

  return (
    <FiszkiContext.Provider
      value={{
        polskiText,
        setPolskiText,
        angielskiText,
        setAngielskiText,
        kontekstText,
        setKontekstText,
        indexFiszek,
        jakiZestawDoWyswietlenia,
        fiszki,
        setFiszki,
        setJakiZestawDoWyswietlenia,
        setIndexFiszek,
        switchTaFiszkaJuzByla,
        setSwitchTaFiszkaJuzByla,
        indexX,
        setIndexX,
        opcjeJezyj,
        setOpcjeJezyk,
        back,
        setBack,
        front,
        setFront,
        wybranaFiszka,
        setWybranaFiszka,
        fiszkaDoEdycji,
        setFiszkaDoEdycji,
        dadajGrupeFiszek,
        setDodajGrupeFiszek,
        dodajFiszke,
        setDodajFiszke,
        idEdytowaniejFiszki,
        setIdEdytowanejFiszki,
        ogolneStatystyki,
        setOgolneStatystyki,
      }}
    >
      {children}
    </FiszkiContext.Provider>
  );
};

// 4. Hook do łatwego użycia
export const useFiszki = () => {
  const context = useContext(FiszkiContext);
  if (!context) throw new Error("useFiszki musi być użyte wewnątrz FiszkiProvider");
  return context;
};
