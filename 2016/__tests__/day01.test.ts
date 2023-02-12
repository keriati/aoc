import * as fs from "fs";
import * as path from "path";
import { getDistance, getDistanceToTwiceVisited } from "../day01";

describe("Advent of Code 2016", () => {
  describe("Day 01: No Time for a Taxicab", () => {
    it("returns the distance", () => {
      expect(getDistance(`R2, L3`)).toBe(5);
      expect(getDistance(`R2, R2, R2`)).toBe(2);
      expect(getDistance(`R5, L5, R5, R3`)).toBe(12);
    });

    it("returns the distance - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day01.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getDistance(input);

      expect(actual).toBe(161);
    });

    it("returns the distance to the first location visited twice", () => {
      expect(getDistanceToTwiceVisited(`R8, R4, R4, R8`)).toBe(4);
    });

    it("returns the distance to the first location visited twice - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day01.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getDistanceToTwiceVisited(input);

      expect(actual).toBe(110);
    });
  });
});
