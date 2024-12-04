import * as fs from "fs";
import * as path from "path";
import { getXMASCount, getX_MASCount } from "../day04";

const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

describe("Advent of Code 2024", () => {
  describe("Day 04: Ceres Search", () => {
    it("returns the number of occurrences of XMAS", () => {
      const actual = getXMASCount(input);

      expect(actual).toBe(18);
    });

    it("returns the number of occurrences of XMAS - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day04.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getXMASCount(fileInput);

      expect(actual).toBe(2547);
    });

    it("returns the number of occurrences of X-MAS", () => {
      const actual = getX_MASCount(input);

      expect(actual).toBe(9);
    });

    it("returns the number of occurrences of X-MAS - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day04.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getX_MASCount(fileInput);

      expect(actual).toBe(1939);
    });
  });
});
