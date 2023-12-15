import * as fs from "fs";
import * as path from "path";
import { getExtrapolatedSum, getExtrapolatedSumReverse } from "../day09";

const input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

describe("Advent of Code 2023", () => {
  describe("Day 09: Mirage Maintenance", () => {
    it("returns the sum of extrapolated values", () => {
      const actual = getExtrapolatedSum(input);

      expect(actual).toBe(114);
    });

    it("returns the sum of extrapolated values - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day09.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getExtrapolatedSum(fileInput);

      expect(actual).not.toBe(727894249);
      expect(actual).not.toBe(1995001777);
      expect(actual).toBe(1995001648);
    });

    it("returns the sum of reversed extrapolated values", () => {
      const actual = getExtrapolatedSumReverse(input);

      expect(actual).toBe(2);
    });

    it("returns the sum of reversed extrapolated values - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day09.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getExtrapolatedSumReverse(fileInput);

      expect(actual).toBe(988);
    });
  });
});
