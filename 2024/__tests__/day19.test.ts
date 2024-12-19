import * as fs from "fs";
import * as path from "path";
import { getDesignCount, getDesignCombinations } from "../day19";

const input = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

describe("Advent of Code 2024", () => {
  describe("Day 19: Linen Layout", () => {
    it("returns the number of designs possible", () => {
      const actual = getDesignCount(input);

      expect(actual).toBe(6);
    });

    it("returns the number of designs possible - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day19.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getDesignCount(fileInput);

      expect(actual).toBe(283);
    });

    it("returns the number of ways to make each design", () => {
      const actual = getDesignCombinations(input);

      expect(actual).toBe(16);
    });

    it("returns the number of ways to make each design - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day19.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getDesignCombinations(fileInput);

      expect(actual).toBe(615388132411142);
    });
  });
});
