import * as fs from "fs";
import * as path from "path";
import { getPartNumberSum, getGearRatioSum } from "../day03";

const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

describe("Advent of Code 2023", () => {
  describe("Day 03", () => {
    it("returns the sum of engine part numbers", () => {
      const actual = getPartNumberSum(input);

      expect(actual).toBe(4361);
    });

    it("returns the sum of engine part numbers - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day03.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getPartNumberSum(fileInput);

      expect(actual).not.toBe(7586455);
      expect(actual).not.toBe(7584207);
      expect(actual).not.toBe(7649536);
      expect(actual).not.toBe(536262);
      expect(actual).toBe(540212);
    });

    it("returns the sum of gear ratios", () => {
      const actual = getGearRatioSum(input);

      expect(actual).toBe(467835);
    });

    it("returns the sum of gear ratios - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day03.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getGearRatioSum(fileInput);

      expect(actual).toBe(87605697);
    });
  });
});
