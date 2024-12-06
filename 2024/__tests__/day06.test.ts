import * as fs from "fs";
import * as path from "path";
import { getResult, getResultPart2 } from "../day06";

const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

describe("Advent of Code 2024", () => {
  describe("Day 06", () => {
    it("returns the result", () => {
      const actual = getResult(input);

      expect(actual).toBe(41);
    });

    it("returns the result - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day06.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput);

      expect(actual).toBe(4454);
    });

    it("returns the result part 2", () => {
      const actual = getResultPart2(input);

      expect(actual).toBe(6);
    });

    it("returns the result part 2 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day06.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResultPart2(fileInput);

      expect(actual).not.toBe(1410);
      expect(actual).toBe(1503);
    });
  });
});
