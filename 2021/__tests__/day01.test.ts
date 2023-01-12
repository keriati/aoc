import * as fs from "fs";
import * as path from "path";
import { getIncreases, getIncreasesWithWindow } from "../day01";

describe("Advent of Code 2021", () => {
  describe("Day 1: Sonar Sweep", () => {
    it("returns the increases in the measurement", () => {
      const input = `199
200
208
210
200
207
240
269
260
263`;
      const actual = getIncreases(input);

      expect(actual).toBe(7);
    });

    it("returns the increases in the measurement - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day01.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getIncreases(input);

      expect(actual).toBe(1529);
    });

    it("returns the increases in the measurement in windows of 3", () => {
      const input = `199
200
208
210
200
207
240
269
260
263`;
      const actual = getIncreasesWithWindow(input);

      expect(actual).toBe(5);
    });

    it("returns the increases in the measurement - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day01.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getIncreasesWithWindow(input);

      expect(actual).toBe(1567);
    });
  });
});
