import * as fs from "fs";
import * as path from "path";
import { getOverlapping, getOverlappingFull } from "../day04";

const testInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

describe("Advent of Code", () => {
  describe("Day 4: Camp Cleanup", () => {
    it("returns the number of fully overlapping section assignments", () => {
      const actual = getOverlappingFull(testInput);

      expect(actual).toBe(2);
    });

    it("returns the number of fully overlapping section assignments from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day04.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getOverlappingFull(input);

      expect(actual).toBe(424);
    });

    it("returns the number of overlapping section assignments", () => {
      const actual = getOverlapping(testInput);

      expect(actual).toBe(4);
    });

    it("returns the number of overlapping section assignments from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day04.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getOverlapping(input);

      expect(actual).toBe(804);
    });
  });
});
