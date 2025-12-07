import * as fs from "fs";
import * as path from "path";
import { getResult, getResultPart2 } from "../day07";

const input = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

describe("Advent of Code 2025", () => {
  describe("Day 07", () => {
    it("returns the result", () => {
      const actual = getResult(input);

      expect(actual).toBe(21);
    });

    it("returns the result - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day07.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput);

      expect(actual).toBe(1570);
    });

    it("returns the result part 2", () => {
      const actual = getResultPart2(input);

      expect(actual).toBe(40);
    });

    it("returns the result part 2 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day07.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResultPart2(fileInput);

      // expect(actual).toBe(3138); NOT
      expect(actual).toBe(15118009521693);
    });
  });
});
