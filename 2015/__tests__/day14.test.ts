import * as fs from "fs";
import * as path from "path";
import { getWinningDeerDistance, getWinningDeerScore } from "../day14";

const input = `Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`;

describe("Advent of Code 2015", () => {
  describe("Day 14: Reindeer Olympics", () => {
    it("returns the distance of the winning reindeer", () => {
      const actual = getWinningDeerDistance(input, 1000);

      expect(actual).toBe(1120);
    });

    it("returns the distance of the winning reindeer - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day14.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getWinningDeerDistance(fileInput, 2503);

      expect(actual).toBe(2696);
    });

    it("returns the points of the winning reindeer", () => {
      const actual = getWinningDeerScore(input, 1000);

      expect(actual).toBe(689);
    });

    it("returns the points of the winning reindeer - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day14.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getWinningDeerScore(fileInput, 2503);

      expect(actual).toBe(1084);
    });
  });
});
