import obliczNoweStatystyki from "@/app/UI/utilities/helpers/obliczNoweStatystyki";
import { Ogolne } from "@/app/context/FiszkiContextTypes";

describe("test funkcji obliczNoweStatystyki", () => {
  const mockPrev: Ogolne = [
    { data: [11, 5, 2025], dzienTygodnia: 5, slowka: ["cat", "fish", "cow", "fly"] },
    { data: [10, 5, 2025], dzienTygodnia: 4, slowka: ["cat", "fish", "cow", "fly", "dog"] },
  ];
  const mockAngielskiText = "bird";
  const mockDataTeraz = { day: 6, data: 12, month: 5, year: 2025, pelnaData: [12, 5, 2025] };

  it("gdy wszystko OK", () => {
    const ret = obliczNoweStatystyki(mockPrev, mockAngielskiText, mockDataTeraz);

    expect(ret).toEqual([
      { data: [11, 5, 2025], dzienTygodnia: 5, slowka: ["cat", "fish", "cow", "fly"] },
      { data: [10, 5, 2025], dzienTygodnia: 4, slowka: ["cat", "fish", "cow", "fly", "dog"] },
      { data: [12, 5, 2025], dzienTygodnia: 6, slowka: ["bird"] },
    ]);
    expect(ret).not.toBe(mockPrev);
    expect(ret).toHaveLength(3);
  });

  it("nie powinna mutować stanu wejściowego", () => {
    const kopiaBezpieczenstwa = JSON.parse(JSON.stringify(mockPrev));

    obliczNoweStatystyki(mockPrev, mockAngielskiText, mockDataTeraz);

    expect(mockPrev).toEqual(kopiaBezpieczenstwa);
  });

  it("kiedy prev == 30 sztuk", () => {
    // 1. Stwórz wzorzec (jeden przykładowy obiekt)
    const wzorzec = {
      data: [1, 1, 2025],
      dzienTygodnia: 1,
      slowka: ["test"],
    };

    const dlugaListaMock = Array.from({ length: 30 }, (_, index) => {
      return {
        ...wzorzec,
        data: [index + 1, 1, 2025],
      };
    });

    const ret = obliczNoweStatystyki(dlugaListaMock, mockAngielskiText, mockDataTeraz);
    const ostatniElement = ret.at(-1);

    const staryDrugiElement = dlugaListaMock[1];
    const nowyPierwszyElement = ret[0];
    expect(nowyPierwszyElement).toEqual(staryDrugiElement);

    expect(ostatniElement?.slowka).toEqual(["bird"]);
    expect(ret).toHaveLength(30);
  });
  it("kiedy mamy juz obiekt o danym indeksie", () => {
    const ret = obliczNoweStatystyki(mockPrev, mockAngielskiText, {
      day: 4,
      data: 10,
      month: 5,
      year: 2025,
      pelnaData: [10, 5, 2025],
    });

    expect(ret[1].slowka).toEqual(["cat", "fish", "cow", "fly", "dog", "bird"]);
  });
});
