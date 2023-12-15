import * as fs from "fs";
import * as path from "path";
import { getCalibrationValueSum, getCalibrationValueSumP2 } from "../day01";

const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const inputP2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

describe("Advent of Code 2023", () => {
  describe("Day 01: Trebuchet?!", () => {
    it("returns the sum of digits", () => {
      const actual = getCalibrationValueSum(input);

      expect(actual).toBe(142);
    });

    it("returns the sum of digits - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day01.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getCalibrationValueSum(fileInput);

      expect(actual).toBe(56108);
    });

    it("returns the sum of digits when letters are considered", () => {
      const actual = getCalibrationValueSumP2(inputP2);

      expect(actual).toBe(281);
    });

    it("returns the sum of digits when letters are considered - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day01.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getCalibrationValueSumP2(fileInput);

      expect(actual).toBe(55652);
    });
  });
});
