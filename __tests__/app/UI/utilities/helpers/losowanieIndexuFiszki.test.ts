import { fiszki } from "@/app/context/FiszkiContextTypes.ts";
import losowanieIndexuFiszki from "@/app/UI/utilities/helpers/losowanieIndexuFiszki";

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

describe("Funkcja losowanieIndexuFiszki", () => {
  it("losowanie pierwszego elementu", () => {
    const test = losowanieIndexuFiszki({ fiszki: stanPoczatkowy, indexFiszek: 0, randomNum: 0.99 });

    expect(test).toBe(1);
  });

  it("tablica fiszek nie istnieje", () => {
    const test = losowanieIndexuFiszki({ fiszki: [], indexFiszek: 0, randomNum: 0.99 });

    expect(test).toBe(0);
  });
});
