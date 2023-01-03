import * as fs from "fs";
import * as path from "path";
import { getResult, getResultPart2 } from "../day11";

describe("Advent of Code 2021", () => {
  describe("Day 11: Dumbo Octopus", () => {
    it("returns the result", () => {
      const input = `11111
19991
19191
19991
11111`;
      const actual = getResult(input, 1);

      expect(actual).toBe(9);
    });

    it("returns the result 2", () => {
      const input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;
      const actual = getResult(input, 10);

      expect(actual).toBe(204);
    });

    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day11.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input, 100);

      expect(actual).toBe(1721);
    });

    it("returns the result part 2", () => {
      const input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;
      const actual = getResultPart2(input);

      expect(actual).toBe(195);
    });

    it("returns the result part 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day11.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResultPart2(input);

      expect(actual).toBe(298);
    });
  });
});
