import * as fs from "fs";
import * as path from "path";
import { getNumberOfTrees, getNumberOfTreesProd } from "../day03";

const input = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;

describe("Advent of Code 2020", () => {
  describe("Day 03: Toboggan Trajectory", () => {
    it("returns the number of trees on the slope", () => {
      const actual = getNumberOfTrees(input);

      expect(actual).toBe(7);
    });

    it("returns the number of trees on the slope - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day03.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getNumberOfTrees(input);

      expect(actual).toBe(254);
    });

    it("returns the result 2", () => {
      const actual = getNumberOfTreesProd(input);

      expect(actual).toBe(336);
    });

    it("returns the result 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day03.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getNumberOfTreesProd(input);

      expect(actual).toBe(1666768320);
    });
  });
});
