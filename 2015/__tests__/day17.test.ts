import * as fs from "fs";
import * as path from "path";
import { getBottleComb, getMinAmountComb } from "../day17";

describe("Advent of Code 2015", () => {
  describe("Day 17: No Such Thing as Too Much", () => {
    it("returns the number of combinations to fill the bottles example", () => {
      const input = `20
15
10
5
5`;

      const actual = getBottleComb(input, 25);

      expect(actual).toBe(4);
    });

    it("returns the number of combinations to fill the bottles - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day17.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getBottleComb(fileInput, 150);

      expect(actual).toBe(654);
    });

    it("returns the number of combinations to fill the min amount of bottles - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day17.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getMinAmountComb(fileInput, 150);

      expect(actual).toBe(57);
    });
  });
});
