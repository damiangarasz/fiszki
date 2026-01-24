import { wypelnianieKartSlowami } from "@/app/UI/utilities/logic/wypelnianieKartSlowami";

describe("testowanie funkcji wypelnianieKartSlowami", () => {
  const mockRandomNum = 0.9;
  const mockOpcjeJezyj = "PL";
  const mockWybranaFiszka = {
    id: "1023uhas",
    polski: "krowa",
    angielski: "cow",
    kontekst: "brak kontekstu",
  };

  let mockSetFront: jest.Mock;
  let mockSetBack: jest.Mock;
  let mockSetTriggerReload: jest.Mock;

  beforeEach(() => {
    mockSetFront = jest.fn();
    mockSetBack = jest.fn();
    mockSetTriggerReload = jest.fn();
    jest.clearAllMocks();
  });

  it("co jeśli wybranaFiszka nie istnieje", () => {
    wypelnianieKartSlowami({
      randomNum: mockRandomNum,
      opcjeJezyj: mockOpcjeJezyj,
      setFront: mockSetFront,
      setBack: mockSetBack,
      wybranaFiszka: {} as any,
      setTriggerReload: mockSetTriggerReload,
    });

    expect(mockSetTriggerReload).toHaveBeenCalled();

    const updateFunction = mockSetTriggerReload.mock.calls[0][0];
    expect(updateFunction(false)).toBe(true);
  });

  it("sprawdzanie setterów setFront i setBack", () => {
    wypelnianieKartSlowami({
      randomNum: mockRandomNum,
      opcjeJezyj: mockOpcjeJezyj,
      setFront: mockSetFront,
      setBack: mockSetBack,
      wybranaFiszka: mockWybranaFiszka,
      setTriggerReload: mockSetTriggerReload,
    });

    expect(mockSetFront).toHaveBeenCalled();
    expect(mockSetBack).toHaveBeenCalled();

    expect(mockSetFront).toHaveBeenCalledWith(mockWybranaFiszka.angielski);
    expect(mockSetBack).toHaveBeenCalledWith(mockWybranaFiszka.polski);
  });

  it("else if EN", () => {
    wypelnianieKartSlowami({
      randomNum: mockRandomNum,
      opcjeJezyj: "EN",
      setFront: mockSetFront,
      setBack: mockSetBack,
      wybranaFiszka: mockWybranaFiszka,
      setTriggerReload: mockSetTriggerReload,
    });

    expect(mockSetFront).toHaveBeenCalled();
    expect(mockSetBack).toHaveBeenCalled();

    expect(mockSetFront).toHaveBeenCalledWith(mockWybranaFiszka.polski);
    expect(mockSetBack).toHaveBeenCalledWith(mockWybranaFiszka.angielski);
  });

  it("coin flip mały", () => {
    wypelnianieKartSlowami({
      randomNum: 0.4,
      opcjeJezyj: "test",
      setFront: mockSetFront,
      setBack: mockSetBack,
      wybranaFiszka: mockWybranaFiszka,
      setTriggerReload: mockSetTriggerReload,
    });

    expect(mockSetFront).toHaveBeenCalled();
    expect(mockSetBack).toHaveBeenCalled();

    expect(mockSetFront).toHaveBeenCalledWith(mockWybranaFiszka.angielski);
    expect(mockSetBack).toHaveBeenCalledWith(mockWybranaFiszka.polski);
  });

  it("coin flip duży", () => {
    wypelnianieKartSlowami({
      randomNum: 0.6,
      opcjeJezyj: "test",
      setFront: mockSetFront,
      setBack: mockSetBack,
      wybranaFiszka: mockWybranaFiszka,
      setTriggerReload: mockSetTriggerReload,
    });

    expect(mockSetFront).toHaveBeenCalled();
    expect(mockSetBack).toHaveBeenCalled();

    expect(mockSetFront).toHaveBeenCalledWith(mockWybranaFiszka.polski);
    expect(mockSetBack).toHaveBeenCalledWith(mockWybranaFiszka.angielski);
  });

  it("jeżeli nie ma randomNum", () => {
    wypelnianieKartSlowami({
      randomNum: undefined as any,
      opcjeJezyj: mockOpcjeJezyj,
      setFront: mockSetFront,
      setBack: mockSetBack,
      wybranaFiszka: mockWybranaFiszka,
      setTriggerReload: mockSetTriggerReload,
    });

    expect(mockSetBack).not.toHaveBeenCalled();
    expect(mockSetBack).not.toHaveBeenCalled();
    expect(mockSetTriggerReload).not.toHaveBeenCalled();
  });
});
