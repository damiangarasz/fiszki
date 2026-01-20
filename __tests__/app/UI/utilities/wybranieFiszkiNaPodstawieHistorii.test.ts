import wybranieFiszkiNaPodstawieHistorii, {
  aktualizujHistorie,
} from "@/app/UI/utilities/logic/wybranieFiszkiNaPodstawieHistorii";
import { fiszki } from "@/app/context/FiszkiContextTypes.ts";

const prevHistoria = ["kot", "żaba", "pies", "żyrafa", "miś"];

describe("funkcja aktualizujHistorie", () => {
  it("jak wszystko OK", () => {
    const test = aktualizujHistorie(prevHistoria, "koń");

    expect(test).toEqual(["żaba", "pies", "żyrafa", "miś", "koń"]);
    expect(test).toHaveLength(5);
  });

  it("jak tablica mniejsza niż 5", () => {
    const krotkaHistoria = ["kot", "pies"];

    const test = aktualizujHistorie(krotkaHistoria, "koń");

    expect(test).toEqual(["kot", "pies", "koń"]);
  });

  it("czy mutuje", () => {
    const test = aktualizujHistorie(prevHistoria, "koń");
    const kopiaDlaPewnosci = [...prevHistoria];

    expect(test).not.toBe(prevHistoria);
    expect(prevHistoria).toEqual(kopiaDlaPewnosci);
  });
});

describe("funkcja wybranieFiszkiNaPodstawieHistorii", () => {
  let mockSetIndexX: jest.Mock;
  let mockSetWybranaFiszka: jest.Mock;
  let mockSetHistoria: jest.Mock;
  let mockSetSwitchTaFiszkaJuzByla: jest.Mock;

  beforeEach(() => {
    mockSetIndexX = jest.fn();
    mockSetWybranaFiszka = jest.fn();
    mockSetHistoria = jest.fn();
    mockSetSwitchTaFiszkaJuzByla = jest.fn();
    jest.clearAllMocks();
  });

  const stanPoczatkowy: fiszki = [
    {
      key: "Moje Fiszki",
      lista: [
        {
          id: "109j=sd",
          polski: "kot",
          angielski: "cat",
          kontekst: "",
          waga: 0.5,
          znamNieZnam: 0,
        },
        {
          id: "2aasd",
          polski: "pies",
          angielski: "dog",
          kontekst: "",
          waga: 1,
          znamNieZnam: 1,
        },
      ],
    },
    {
      key: "Inny zestaw",
      lista: [
        {
          id: "109j=sd",
          polski: "kot",
          angielski: "cat",
          kontekst: "",
          waga: 0.5,
          znamNieZnam: 0,
        },
        {
          id: "2aasd",
          polski: "pies",
          angielski: "dog",
          kontekst: "",
          waga: 1,
          znamNieZnam: 1,
        },
      ],
    },
  ];

  const stanPoczatkowyDlugi: fiszki = [
    {
      key: "Moje Fiszki",
      lista: [
        {
          id: "109j=sd",
          polski: "kot",
          angielski: "cat",
          kontekst: "",
          waga: 0.5,
          znamNieZnam: 0,
        },
        {
          id: "2aasd",
          polski: "pies",
          angielski: "dog",
          kontekst: "",
          waga: 1,
          znamNieZnam: 1,
        },
        {
          id: "2aasd",
          polski: "pszczoła",
          angielski: "dog",
          kontekst: "",
          waga: 1,
          znamNieZnam: 1,
        },
        {
          id: "2aasd",
          polski: "koń",
          angielski: "dog",
          kontekst: "",
          waga: 1,
          znamNieZnam: 1,
        },
        {
          id: "2aasd",
          polski: "żyrafa",
          angielski: "dog",
          kontekst: "",
          waga: 1,
          znamNieZnam: 1,
        },
        {
          id: "2aasd",
          polski: "świnka",
          angielski: "dog",
          kontekst: "",
          waga: 1,
          znamNieZnam: 1,
        },
      ],
    },
  ];

  it("co jeśli fiszki lub któryś element w drzewie jest undefined", () => {
    wybranieFiszkiNaPodstawieHistorii({
      fiszki: stanPoczatkowy,
      indexFiszek: 11, //daje nieistniejący index
      setIndexX: mockSetIndexX,
      setWybranaFiszka: mockSetWybranaFiszka,
      setHistoria: mockSetHistoria,
      setSwitchTaFiszkaJuzByla: mockSetSwitchTaFiszkaJuzByla,
      sprHistorii: false,
      index: 0,
    });

    expect(mockSetIndexX).not.toHaveBeenCalled();
    expect(mockSetWybranaFiszka).not.toHaveBeenCalled();
    expect(mockSetHistoria).not.toHaveBeenCalled();
    expect(mockSetSwitchTaFiszkaJuzByla).not.toHaveBeenCalled();
  });

  it("sprawdzenie setterów statycznych", () => {
    wybranieFiszkiNaPodstawieHistorii({
      fiszki: stanPoczatkowy,
      indexFiszek: 0,
      setIndexX: mockSetIndexX,
      setWybranaFiszka: mockSetWybranaFiszka,
      setHistoria: mockSetHistoria,
      setSwitchTaFiszkaJuzByla: mockSetSwitchTaFiszkaJuzByla,
      sprHistorii: false,
      index: 0,
    });

    expect(mockSetIndexX).toHaveBeenCalledWith(0);
    expect(mockSetWybranaFiszka).toHaveBeenCalledWith(stanPoczatkowy[0].lista[0]);
  });

  it("sprawdzenie setterów dynamicznych", () => {
    wybranieFiszkiNaPodstawieHistorii({
      fiszki: stanPoczatkowyDlugi,
      indexFiszek: 0,
      setIndexX: mockSetIndexX,
      setWybranaFiszka: mockSetWybranaFiszka,
      setHistoria: mockSetHistoria,
      setSwitchTaFiszkaJuzByla: mockSetSwitchTaFiszkaJuzByla,
      sprHistorii: false,
      index: 0,
    });

    expect(mockSetHistoria).toHaveBeenCalled();

    // WYCIĄGAMY FUNKCJĘ Z MOCKA
    // mock.calls[0] -> pierwsze wywołanie settera
    // mock.calls[0][0] -> pierwszy argument tego wywołania (czyli Twoja funkcja (prev) => ...)
    const updateFunction = mockSetHistoria.mock.calls[0][0];
    const prev = ["robak", "słoń", "ryba", "nosorożec", "ptak"];
    const nowaHistoria = updateFunction(prev);

    expect(nowaHistoria).toEqual(["słoń", "ryba", "nosorożec", "ptak", "kot"]);
  });

  it("sprawdzenie setSwitchTaFiszkaJuzByla", () => {
    wybranieFiszkiNaPodstawieHistorii({
      fiszki: stanPoczatkowyDlugi,
      indexFiszek: 0,
      setIndexX: mockSetIndexX,
      setWybranaFiszka: mockSetWybranaFiszka,
      setHistoria: mockSetHistoria,
      setSwitchTaFiszkaJuzByla: mockSetSwitchTaFiszkaJuzByla,
      sprHistorii: true,
      index: 0,
    });

    expect(mockSetSwitchTaFiszkaJuzByla).toHaveBeenCalled();

    const updateFunction = mockSetSwitchTaFiszkaJuzByla.mock.calls[0][0];
    expect(updateFunction(false)).toBe(true);

    expect(mockSetIndexX).not.toHaveBeenCalled();
    expect(mockSetHistoria).not.toHaveBeenCalled();
  });
});
