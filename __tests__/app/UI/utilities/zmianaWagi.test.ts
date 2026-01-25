import zmianaWagi, { zmianaWagiSetFiszki } from "@/app/UI/utilities/logic/zmianaWagi";

describe("testowanie zmianaWagi()", () => {
  let mockSetFiszki: jest.Mock;

  beforeEach(() => {
    mockSetFiszki = jest.fn();
    jest.clearAllMocks();
  });

  it("jeżeli wszystko jest OK", () => {
    const mockPrev = [
      {
        key: "asqw1w2-q",
        lista: [
          {
            id: "13a1",
            polski: "kurczak",
            angielski: "chicken",
            kontekst: "",
            waga: 5,
            znamNieznam: 0,
          },
        ],
      },
    ];

    zmianaWagi(mockSetFiszki, 0, 0, "znam");
    expect(mockSetFiszki).toHaveBeenCalled();

    const funkcjaTestowa = mockSetFiszki.mock.calls[0][0];
    const ret = funkcjaTestowa(mockPrev, 0, 0, "znam");
    expect(ret).toEqual([
      {
        key: "asqw1w2-q",
        lista: [
          {
            id: "13a1",
            polski: "kurczak",
            angielski: "chicken",
            kontekst: "",
            waga: 4,
            znamNieznam: 0,
          },
        ],
      },
    ]);
  });

  it("neipoprawne argumenty", () => {
    zmianaWagi(mockSetFiszki, 0, 0, "");
    expect(mockSetFiszki).not.toHaveBeenCalled();

    zmianaWagi(mockSetFiszki, 0, -1, "znam");
    expect(mockSetFiszki).not.toHaveBeenCalled();
  });

  it("funkcja nie powinna mutowac stanu prev", () => {
    const mockPrev = [
      {
        key: "asqw1w2-q",
        lista: [
          {
            id: "13a1",
            polski: "kurczak",
            angielski: "chicken",
            kontekst: "",
            waga: 5,
            znamNieznam: 0,
          },
        ],
      },
    ];
    const bezpiecznaKopia = JSON.parse(JSON.stringify(mockPrev));
    zmianaWagi(mockSetFiszki, 0, 0, "znam");
    const funkcjaTestowa = mockSetFiszki.mock.calls[0][0];
    funkcjaTestowa(mockPrev, 0, 0, "znam");

    expect(mockPrev).toEqual(bezpiecznaKopia);
  });
});

describe("testowanie zmianaWagiSetFiszki", () => {
  const mockPrev = [
    {
      key: "asqw1w2-q",
      lista: [
        {
          id: "13a1",
          polski: "kurczak",
          angielski: "chicken",
          kontekst: "",
          waga: 5,
          znamNieZnam: 0,
        },
        {
          id: "1as1",
          polski: "ziemniak",
          angielski: "potato",
          kontekst: "",
          waga: 5,
          znamNieZnam: 0,
        },
      ],
    },
    {
      key: "asq23w2-q",
      lista: [
        {
          id: "13wa1",
          polski: "ziemniak",
          angielski: "tomato",
          kontekst: "",
          waga: 5,
          znamNieZnam: 0,
        },
      ],
    },
  ];

  const ZIEMNIAK = {
    id: "1as1",
    polski: "ziemniak",
    angielski: "potato",
    kontekst: "",
    waga: 5,
    znamNieZnam: 0,
  };

  const OBIEKT2 = {
    key: "asq23w2-q",
    lista: [
      {
        id: "13wa1",
        polski: "ziemniak",
        angielski: "tomato",
        kontekst: "",
        waga: 5,
        znamNieZnam: 0,
      },
    ],
  };

  it("sprawdzenie ifów znam", () => {
    const ret = zmianaWagiSetFiszki(mockPrev, 0, 0, "znam");
    expect(mockPrev[1]).toEqual({
      key: "asq23w2-q",
      lista: [
        {
          id: "13wa1",
          polski: "ziemniak",
          angielski: "tomato",
          kontekst: "",
          waga: 5,
          znamNieZnam: 0,
        },
      ],
    });

    expect(mockPrev[0].lista[1]).toEqual({
      id: "1as1",
      polski: "ziemniak",
      angielski: "potato",
      kontekst: "",
      waga: 5,
      znamNieZnam: 0,
    });

    expect(ret).toEqual([
      {
        key: "asqw1w2-q",
        lista: [
          {
            id: "13a1",
            polski: "kurczak",
            angielski: "chicken",
            kontekst: "",
            waga: 4,
            znamNieZnam: 0,
          },
          ZIEMNIAK,
        ],
      },
      OBIEKT2,
    ]);

    const ret2 = zmianaWagiSetFiszki(
      [
        {
          key: "asqw1w2-q",
          lista: [
            {
              id: "13a1",
              polski: "kurczak",
              angielski: "chicken",
              kontekst: "",
              waga: 4,
              znamNieZnam: 0,
            },
            ZIEMNIAK,
          ],
        },
        OBIEKT2,
      ],
      0,
      0,
      "znam"
    );

    expect(ret2).toEqual([
      {
        key: "asqw1w2-q",
        lista: [
          {
            id: "13a1",
            polski: "kurczak",
            angielski: "chicken",
            kontekst: "",
            waga: 3,
            znamNieZnam: 0,
          },
          ZIEMNIAK,
        ],
      },
      OBIEKT2,
    ]);

    const ret3 = zmianaWagiSetFiszki(
      [
        {
          key: "asqw1w2-q",
          lista: [
            {
              id: "13a1",
              polski: "kurczak",
              angielski: "chicken",
              kontekst: "",
              waga: 1,
              znamNieZnam: 0,
            },
            ZIEMNIAK,
          ],
        },
        OBIEKT2,
      ],
      0,
      0,
      "znam"
    );

    expect(ret3).toEqual([
      {
        key: "asqw1w2-q",
        lista: [
          {
            id: "13a1",
            polski: "kurczak",
            angielski: "chicken",
            kontekst: "",
            waga: 1,
            znamNieZnam: 0,
          },
          ZIEMNIAK,
        ],
      },
      OBIEKT2,
    ]);

    const ret4 = zmianaWagiSetFiszki(
      [
        {
          key: "asqw1w2-q",
          lista: [
            {
              id: "13a1",
              polski: "kurczak",
              angielski: "chicken",
              kontekst: "",
              waga: 6,
              znamNieZnam: 0,
            },
            ZIEMNIAK,
          ],
        },
        OBIEKT2,
      ],
      0,
      0,
      "znam"
    );

    expect(ret4).toEqual([
      {
        key: "asqw1w2-q",
        lista: [
          {
            id: "13a1",
            polski: "kurczak",
            angielski: "chicken",
            kontekst: "",
            waga: 4,
            znamNieZnam: 0,
          },
          ZIEMNIAK,
        ],
      },
      OBIEKT2,
    ]);
  });

  it("sprawdzenie ifów nieZnam", () => {
    const ret = zmianaWagiSetFiszki(mockPrev, 0, 0, "nieZnam");
    expect(mockPrev[1]).toEqual({
      key: "asq23w2-q",
      lista: [
        {
          id: "13wa1",
          polski: "ziemniak",
          angielski: "tomato",
          kontekst: "",
          waga: 5,
          znamNieZnam: 0,
        },
      ],
    });

    expect(ret).toEqual([
      {
        key: "asqw1w2-q",
        lista: [
          {
            id: "13a1",
            polski: "kurczak",
            angielski: "chicken",
            kontekst: "",
            waga: 6,
            znamNieZnam: 0,
          },
          ZIEMNIAK,
        ],
      },
      OBIEKT2,
    ]);

    const ret2 = zmianaWagiSetFiszki(
      [
        {
          key: "asqw1w2-q",
          lista: [
            {
              id: "13a1",
              polski: "kurczak",
              angielski: "chicken",
              kontekst: "",
              waga: 6,
              znamNieZnam: 0,
            },
            ZIEMNIAK,
          ],
        },
        OBIEKT2,
      ],
      0,
      0,
      "nieZnam"
    );

    expect(ret2).toEqual([
      {
        key: "asqw1w2-q",
        lista: [
          {
            id: "13a1",
            polski: "kurczak",
            angielski: "chicken",
            kontekst: "",
            waga: 7,
            znamNieZnam: 0,
          },
          ZIEMNIAK,
        ],
      },
      OBIEKT2,
    ]);

    const ret3 = zmianaWagiSetFiszki(
      [
        {
          key: "asqw1w2-q",
          lista: [
            {
              id: "13a1",
              polski: "kurczak",
              angielski: "chicken",
              kontekst: "",
              waga: 10,
              znamNieZnam: 0,
            },
            ZIEMNIAK,
          ],
        },
        OBIEKT2,
      ],
      0,
      0,
      "nieZnam"
    );

    expect(ret3).toEqual([
      {
        key: "asqw1w2-q",
        lista: [
          {
            id: "13a1",
            polski: "kurczak",
            angielski: "chicken",
            kontekst: "",
            waga: 10,
            znamNieZnam: 0,
          },
          ZIEMNIAK,
        ],
      },
      OBIEKT2,
    ]);

    const ret4 = zmianaWagiSetFiszki(
      [
        {
          key: "asqw1w2-q",
          lista: [
            {
              id: "13a1",
              polski: "kurczak",
              angielski: "chicken",
              kontekst: "",
              waga: 4,
              znamNieZnam: 0,
            },
            ZIEMNIAK,
          ],
        },
        OBIEKT2,
      ],
      0,
      0,
      "nieZnam"
    );

    expect(ret4).toEqual([
      {
        key: "asqw1w2-q",
        lista: [
          {
            id: "13a1",
            polski: "kurczak",
            angielski: "chicken",
            kontekst: "",
            waga: 6,
            znamNieZnam: 0,
          },
          ZIEMNIAK,
        ],
      },
      OBIEKT2,
    ]);
  });
  it("nie rusza innych elementów", () => {
    const ret = zmianaWagiSetFiszki(mockPrev, 0, 0, "znam");

    const ziemniakZWyniku = ret[0].lista[1];
    const ziemniakZWejscia = mockPrev[0].lista[1];

    expect(ziemniakZWyniku).toBe(ziemniakZWejscia);
  });

  it("else", () => {
    const ret = zmianaWagiSetFiszki(mockPrev, 0, 0, "inneElse");

    expect(ret).toEqual([
      {
        key: "asqw1w2-q",
        lista: [
          {
            id: "13a1",
            polski: "kurczak",
            angielski: "chicken",
            kontekst: "",
            waga: 5,
            znamNieZnam: 0,
          },
          ZIEMNIAK,
        ],
      },
      OBIEKT2,
    ]);
  });
});
