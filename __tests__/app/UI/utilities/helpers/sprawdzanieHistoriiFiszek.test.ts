import sprawdzanieHistoriiFiszek from "@/app/UI/utilities/helpers/sprawdzanieHistoriiFiszek";
import { fiszki } from "@/app/context/FiszkiContextTypes.ts";

const stanPoczatkowy: fiszki = [
  {
    key: "Moje Fiszki",
    lista: [
      {
        id: "109j=sd",
        polski: "kot",
        angielski: "cat",
        kontekst: "",
        waga: 1,
        znamNieZnam: 0,
      },
      {
        id: "2aasd",
        polski: "pies",
        angielski: "dog",
        kontekst: "",
        waga: 0.1,
        znamNieZnam: 1,
      },
    ],
  },
];

describe("funkcja sprawdzanieHistoriiFiszek", () => {
  it("sprawdzenie gdy historia jest pusta", () => {
    const test = sprawdzanieHistoriiFiszek({
      historia: [],
      fiszki: stanPoczatkowy,
      indexFiszek: 0,
      index: 0,
    });

    expect(test).toBe(false);
  });
  it("gdy fiszki to pusta tablica", () => {
    const test = sprawdzanieHistoriiFiszek({
      historia: ["żyrafa", "pies"],
      fiszki: [],
      indexFiszek: 0,
      index: 0,
    });

    expect(test).toBe(false);
  });
  it("gdy index fiszek jest niepoprawny", () => {
    const test = sprawdzanieHistoriiFiszek({
      historia: ["kot", "pies"],
      fiszki: stanPoczatkowy,
      indexFiszek: -1,
      index: 0,
    });

    expect(test).toBe(false);
  });
  it("jeżeli wszystko jest OK", () => {
    const test = sprawdzanieHistoriiFiszek({
      historia: ["kot", "pies"],
      fiszki: stanPoczatkowy,
      indexFiszek: 0,
      index: 0,
    });

    expect(test).toBe(true);
  });
});
