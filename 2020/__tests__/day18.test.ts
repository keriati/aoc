import * as fs from "fs";
import * as path from "path";
import { getHomeworkResult, getHomeworkResultPart2 } from "../day18";

describe("Advent of Code 2020", () => {
  describe("Day 18: Operation Order", () => {
    it("returns the result examples", () => {
      expect(getHomeworkResult(`2 * 3 + (4 * 5)`)).toBe(26);
      expect(getHomeworkResult(`5 + (8 * 3 + 9 + 3 * 4 * 3)`)).toBe(437);
      expect(
        getHomeworkResult(`5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`)
      ).toBe(12240);
      expect(
        getHomeworkResult(`((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`)
      ).toBe(13632);
    });

    it("returns the result part 1 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day18.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getHomeworkResult(fileInput);

      expect(actual).toBe(69490582260);
    });

    it("returns the result part 2 examples", () => {
      expect(getHomeworkResultPart2(`1 + (2 * 3) + (4 * (5 + 6))`)).toBe(51);
      expect(getHomeworkResultPart2(`2 * 3 + (4 * 5)`)).toBe(46);
      expect(getHomeworkResultPart2(`5 + (8 * 3 + 9 + 3 * 4 * 3)`)).toBe(1445);
      expect(
        getHomeworkResultPart2(`5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`)
      ).toBe(669060);
      expect(
        getHomeworkResultPart2(
          `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`
        )
      ).toBe(23340);
    });

    it("returns the result part 2 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day18.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getHomeworkResultPart2(fileInput);

      expect(actual).toBe(362464596624526);
    });
  });
});
