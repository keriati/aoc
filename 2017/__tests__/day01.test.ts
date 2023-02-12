import * as fs from "fs";
import * as path from "path";
import { getMatchingDigitSum, getHalfwayMatchingDigitSum } from "../day01";

describe("Advent of Code 2017", () => {
  describe("Day 01: Inverse Captcha", () => {
    it("returns the sum of of all digits that match the next digit in the list", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day01.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getMatchingDigitSum(input);

      expect(actual).toBe(1175);
    });

    it("returns the sum of all digits that match the digit halfway around the circular list", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day01.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getHalfwayMatchingDigitSum(input);

      expect(actual).toBe(1166);
    });
  });
});
