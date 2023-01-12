import * as fs from "fs";
import * as path from "path";
import { getTop3Calories, getTopCalories } from "../day01";

const testInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

describe("Advent of Code", () => {
  describe("Day 1", () => {
    it("should return the elv number with most calories 1", () => {
      const topCalories = getTopCalories(testInput);

      expect(topCalories).toBe(24000);
    });

    it("should return the elv number with most calories", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day01.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const topCalories = getTopCalories(input);

      expect(topCalories).toBe(67658);
    });

    it("should return the elv number with most calories 1", () => {
      const actual = getTop3Calories(testInput);

      expect(actual).toBe(45000);
    });

    it("should return the elv number with most calories", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day01.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getTop3Calories(input);

      expect(actual).toBe(200158);
    });
  });
});
