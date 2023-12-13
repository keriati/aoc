import * as fs from "fs";
import * as path from "path";
import { getPatternNotesSum } from "../day13";

const input = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

describe("Advent of Code 2023", () => {
  describe("Day 13", () => {
    it("returns the sum of pattern notes", () => {
      const actual = getPatternNotesSum(input);

      expect(actual).toBe(405);
    });

    it("returns the sum of pattern notes - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day13.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getPatternNotesSum(fileInput);

      expect(actual).not.toBe(25316);
      expect(actual).toBe(35232);
    });

    it("returns the sum of pattern notes with 1 smudge", () => {
      const actual = getPatternNotesSum(input, 1);

      expect(actual).toBe(400);
    });

    it("returns the sum of pattern notes with 1 smudge - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day13.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getPatternNotesSum(fileInput, 1);

      expect(actual).toBe(37982);
    });
  });
});
