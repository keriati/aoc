import * as fs from "fs";
import * as path from "path";
import { getResult, getResultPart2 } from "../day09";

describe("Advent of Code 2021", () => {
  describe("Day 09: Smoke Basin", () => {
    it("returns the result", () => {
      const input = `2199943210
3987894921
9856789892
8767896789
9899965678`;
      const actual = getResult(input);

      expect(actual).toBe(15);
    });

    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day09.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual).toBe(541);
    });

    it("returns the result part 2", () => {
      const input = `2199943210
3987894921
9856789892
8767896789
9899965678`;
      const actual = getResultPart2(input);

      expect(actual).toBe(1134);
    });

    it("returns the result part 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day09.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResultPart2(input);

      expect(actual).toBe(847504);
    });
  });
});
