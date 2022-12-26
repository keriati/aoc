import * as fs from "fs";
import * as path from "path";
import { getLength, getSquareFeet } from "../day2";

describe("Advent of Code 2015", () => {
  describe("Day 2", () => {
    it("should return the required square feet", () => {
      const topCalories = getSquareFeet("2x3x4");

      expect(topCalories).toBe(58);
    });

    it("should return the required square feet - from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day2.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const topCalories = getSquareFeet(input);

      expect(topCalories).toBe(1598415);
    });

    it("should return the required length of ribbon", () => {
      const topCalories = getLength("2x3x4");

      expect(topCalories).toBe(34);
    });

    it("should return the required length of ribbon - from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day2.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const topCalories = getLength(input);

      expect(topCalories).toBe(3812909);
    });
  });
});
