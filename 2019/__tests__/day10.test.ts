import * as fs from "fs";
import * as path from "path";
import { getBestAsteroid, get200th } from "../day10";

const input = `.#..#
.....
#####
....#
...##`;

describe("Advent of Code 2019", () => {
  describe("Day 10: Monitoring Station", () => {
    it("returns the max number of asteroids detected", () => {
      const actual = getBestAsteroid(input);

      expect(actual).toBe(8);
    });

    it("returns the max number of asteroids detected - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day10.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getBestAsteroid(fileInput);

      expect(actual).toBe(256);
    });

    it("returns the 200th asteroid - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day10.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = get200th(fileInput);

      expect(actual).toBe(1707);
    });
  });
});
