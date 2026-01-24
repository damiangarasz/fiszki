import { fiszki } from "../../../../app/context/FiszkiContextTypes.ts";
import zamianaZnamNieZnam from "../../../../app/UI/utilities/logic/zmianaZnamNieZnam.tsx";

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

describe("Funkcja ZamianaZnamNieZNam", () => {
  it("powinna poprawnie zmienić status wybranej fiszki", () => {
    const mockSetFiszki = jest.fn();
    zamianaZnamNieZnam({
      param: 2,
      setFiszki: mockSetFiszki,
      fiszki: stanPoczatkowy,
      indexFiszek: 0,
      indexX: 0,
    });

    const funkcjaAktualizujaca = mockSetFiszki.mock.calls[0][0];
    const wynik = funkcjaAktualizujaca(stanPoczatkowy);

    expect(wynik[0].lista[0].znamNieZnam).toBe(2);
    expect(wynik[0].lista[1].znamNieZnam).toBe(1);
    expect(wynik[1]).toBe(stanPoczatkowy[1]);
    expect(wynik).not.toBe(stanPoczatkowy);
  });

  it("nie powinna zmienić stanu jeżeli jest podany błędny index", () => {
    const mockSetFiszki = jest.fn();
    zamianaZnamNieZnam({
      param: 2,
      setFiszki: mockSetFiszki,
      fiszki: stanPoczatkowy,
      indexFiszek: 2, //zły index, nie ma nic na indeksie 1
      indexX: 0,
    });

    expect(mockSetFiszki).not.toHaveBeenCalled();
  });

  it("nie powinno zmienić stanu jezeli podaje zły index fiszki w zestawie fiszek", () => {
    const mockSetFiszki = jest.fn();
    zamianaZnamNieZnam({
      param: 2,
      setFiszki: mockSetFiszki,
      fiszki: stanPoczatkowy,
      indexFiszek: 0,
      indexX: 3, //zły index, nie ma nic na indeksie 3
    });

    expect(mockSetFiszki).not.toHaveBeenCalled();
  });

  it("nie powinna zmienić znam nie znam jeżeli jest podana zła wartość", () => {
    const mockSetFiszki = jest.fn();
    zamianaZnamNieZnam({
      param: 4,
      setFiszki: mockSetFiszki,
      fiszki: stanPoczatkowy,
      indexFiszek: 0,
      indexX: 0,
    });

    expect(mockSetFiszki).not.toHaveBeenCalled();
  });

  it("nie powinno wykonać akcji jeżeli setFiszki nie jest funkcją", () => {
    const zlySetter = "lol" as any;

    zamianaZnamNieZnam({
      param: 1,
      setFiszki: zlySetter,
      fiszki: stanPoczatkowy,
      indexFiszek: 0,
      indexX: 0,
    });
  });
});
