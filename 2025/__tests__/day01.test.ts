import * as fs from "fs";
import * as path from "path";
import { getResult, getResultPart2 } from "../day01";

const input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

describe("Advent of Code 2025", () => {
  describe("Day 01", () => {
    it("returns the result", () => {
      const actual = getResult(input);

      expect(actual).toBe(3);
    });

    it("returns the result - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day01.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput);

      expect(actual).toBe(992);
    });

    it("returns the result part 2", () => {
      const actual = getResultPart2(input);

      expect(actual).toBe(6);
    });

    it("returns the result part 2 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day01.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResultPart2(fileInput);

      expect(actual).toBe(6133);
    });
  });
});
