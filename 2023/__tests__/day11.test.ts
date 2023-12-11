import * as fs from "fs";
import * as path from "path";
import { getGalaxyDistanceSum } from "../day11";

const input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

describe("Advent of Code 2023", () => {
  describe("Day 11", () => {
    it("returns the sum of shortest paths", () => {
      const actual = getGalaxyDistanceSum(input);

      expect(actual).toBe(374);
    });

    it("returns the sum of shortest paths - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day11.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getGalaxyDistanceSum(fileInput);

      expect(actual).toBe(9647174);
    });

    it("returns the sum of shortest paths expansion rate 10", () => {
      const actual = getGalaxyDistanceSum(input, 10);

      expect(actual).toBe(1030);
    });

    it("returns the sum of shortest paths expansion rate 1000000 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day11.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getGalaxyDistanceSum(fileInput, 1000000);

      expect(actual).toBe(377318892554);
    });
  });
});
