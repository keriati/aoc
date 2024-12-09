import * as fs from "fs";
import * as path from "path";
import { getResult, getResultPart2 } from "../day08";

const input = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

describe("Advent of Code 2024", () => {
  describe("Day 08", () => {
    it("returns the result", () => {
      const actual = getResult(input);

      expect(actual).toBe(14);
    });

    it("returns the result - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day08.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput);

      expect(actual).toBe(348);
    });

    it("returns the result part 2", () => {
      const actual = getResultPart2(input);

      expect(actual).toBe(34);
    });

    it("returns the result part 2 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day08.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResultPart2(fileInput);

      expect(actual).toBe(1221);
    });
  });
});
