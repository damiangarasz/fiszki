import { dodawanieStat } from "@/app/UI/utilities/logic/dodawanieStat";

describe("test funkcji dodawanieStat", () => {
  const mockAngielskiText = "cow";
  const mockDataObj = {
    day: 1,
    data: 2,
    month: 5,
    year: 2025,
    pelnaData: [2, 5, 2025],
  };

  it("testowanie settera", () => {
    const mockSetOgolneStatystyki = jest.fn();
    dodawanieStat({
      setOgolneStatystyki: mockSetOgolneStatystyki,
      angielskiText: mockAngielskiText,
      dataObj: mockDataObj,
    });

    const updateFunction = mockSetOgolneStatystyki.mock.calls[0][0];
    const prev = [{ data: [2, 5, 2025], dzienTygodnia: 1, slowka: ["cat"] }];

    expect(mockSetOgolneStatystyki).toHaveBeenCalled();
    expect(updateFunction(prev)).toEqual([
      { data: [2, 5, 2025], dzienTygodnia: 1, slowka: ["cat", "cow"] },
    ]);
  });

  it("testowanie guarda", () => {
    const mockSetOgolneStatystyki = jest.fn();
    dodawanieStat({
      setOgolneStatystyki: mockSetOgolneStatystyki,
      angielskiText: mockAngielskiText,
      dataObj: undefined as any,
    });

    expect(mockSetOgolneStatystyki).not.toHaveBeenCalled();
  });
});
