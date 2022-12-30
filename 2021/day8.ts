export const getResult = (input) =>
  input.split("\n").reduce(
    (sumNotes, note) =>
      sumNotes +
      note
        .split(" | ")[1]
        .split(" ")
        .reduce(
          (sum, digit) => ([2, 3, 4, 7].includes(digit.length) ? sum + 1 : sum),
          0
        ),
    0
  );

class Decoder {
  private decoded: Map<number, string> = new Map();

  private dict: Map<string, number> = new Map();

  private static sortLetters(val: string) {
    return val.split("").sort().join("");
  }

  private static overlaps(p: string, s: string, min = 0): boolean {
    return s.split("").filter((letter) => !p.includes(letter)).length <= min;
  }

  constructor(patterns: string[]) {
    this.decoded.set(
      1,
      patterns.find((p) => p.length === 2)
    );
    this.decoded.set(
      4,
      patterns.find((p) => p.length === 4)
    );
    this.decoded.set(
      7,
      patterns.find((p) => p.length === 3)
    );
    this.decoded.set(
      8,
      patterns.find((p) => p.length === 7)
    );

    this.decoded.set(
      3,
      patterns.find(
        (p) => p.length === 5 && Decoder.overlaps(p, this.decoded.get(7))
      )
    );

    this.decoded.set(
      9,
      patterns.find(
        (p) => p.length === 6 && Decoder.overlaps(p, this.decoded.get(4))
      )
    );

    this.decoded.set(
      0,
      patterns.find(
        (p) =>
          p.length === 6 &&
          Decoder.overlaps(p, this.decoded.get(1)) &&
          p !== this.decoded.get(9)
      )
    );

    this.decoded.set(
      6,
      patterns.find(
        (p) =>
          p.length === 6 &&
          p !== this.decoded.get(9) &&
          p !== this.decoded.get(0)
      )
    );

    this.decoded.set(
      5,
      patterns.find(
        (p) => p.length === 5 && Decoder.overlaps(p, this.decoded.get(6), 1)
      )
    );

    this.decoded.set(
      2,
      patterns.find((p) => !Array.from(this.decoded.values()).includes(p))
    );

    this.decoded.forEach((val, key) => {
      this.dict.set(Decoder.sortLetters(val), key);
    });
  }

  decode(digits: string[]) {
    return Number.parseInt(
      digits.map((digit) => this.dict.get(Decoder.sortLetters(digit))).join(""),
      10
    );
  }
}

export const getResultPart2 = (input) => {
  const notes = input.split("\n");

  return notes.reduce((sum, note) => {
    const [patterns, digits] = note.split(" | ");

    const decoder = new Decoder(patterns.split(" "));

    return sum + decoder.decode(digits.split(" "));
  }, 0);
};
