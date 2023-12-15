import * as fs from "fs";
import * as path from "path";
import { getResult, getResultPart2 } from "../day06";

const input = `Time:      7  15   30
Distance:  9  40  200`;

describe("Advent of Code 2023", () => {
  describe("Day 06: Wait For It", () => {
    it("returns the product of ways to beat the record", () => {
      const actual = getResult(input);

      expect(actual).toBe(288);
    });

    it("returns the product of ways to beat the record - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day06.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput);

      expect(actual).toBe(1660968);
    });

    it("returns the product of ways to beat the record part 2", () => {
      const actual = getResultPart2(input);

      expect(actual).toBe(71503);
    });

    it("returns the product of ways to beat the record - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day06.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResultPart2(fileInput);

      expect(actual).toBe(26499773);
    });
  });
});
