import * as fs from "fs";
import * as path from "path";
import { getValidEquations, getValidEquationsWithConcat } from "../day07";

const input = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

describe("Advent of Code 2024", () => {
  describe("Day 07: Bridge Repair", () => {
    it("returns the sum of valid expressions", () => {
      const actual = getValidEquations(input);

      expect(actual).toBe(3749);
    });

    it("returns the sum of valid expressions - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day07.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getValidEquations(fileInput);

      expect(actual).toBe(5837374519342);
    });

    it("returns the sum of valid expressions with concat", () => {
      const actual = getValidEquationsWithConcat(input);

      expect(actual).toBe(11387);
    });

    it("returns the sum of valid expressions with concat - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day07.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getValidEquationsWithConcat(fileInput);

      expect(actual).toBe(492383931650959);
    });
  });
});
