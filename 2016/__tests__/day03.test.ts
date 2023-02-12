import * as fs from "fs";
import * as path from "path";
import { getValidTA, getValidTACol } from "../day03";

describe("Advent of Code 2016", () => {
  describe("Day 03: Squares With Three Sides", () => {
    it("returns the number of valid triangles - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day03.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getValidTA(input);

      expect(actual).toBe(862);
    });

    it("returns the number of valid triangles by columns - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day03.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getValidTACol(input);

      expect(actual).toBe(1577);
    });
  });
});
