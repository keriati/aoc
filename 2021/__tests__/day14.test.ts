import * as fs from "fs";
import * as path from "path";
import { getResult } from "../day14";

const input = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

describe("Advent of Code 2021", () => {
  describe("Day 14: Extended Polymerization", () => {
    it("returns the result round 3", () => {
      const actual = getResult(input, 10);

      expect(actual).toEqual(1588);
    });

    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day14.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input, 10);

      expect(actual).toBe(2899);
    });

    it("returns the result part 2", () => {
      const actual = getResult(input, 40);

      expect(actual).toBe(2188189693529);
    });

    it("returns the result part 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day14.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input, 40);

      expect(actual).toBe(3528317079545);
    });
  });
});
