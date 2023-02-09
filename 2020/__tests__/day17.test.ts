import * as fs from "fs";
import * as path from "path";
import { getActiveCubes, getActiveCubes4d } from "../day17";

describe("Advent of Code 2020", () => {
  describe("Day 17: Conway Cubes", () => {
    it("returns number of active cubes after 6 cycles", () => {
      const input = `.#.
..#
###`;
      const actual = getActiveCubes(input);

      expect(actual).toBe(112);
    });

    it("returns number of active cubes after 6 cycles - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day17.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getActiveCubes(input);

      expect(actual).toBe(276);
    });

    it("returns number of active cubes after 6 cycles in 4d", () => {
      const input = `.#.
..#
###`;
      const actual = getActiveCubes4d(input);

      expect(actual).toBe(848);
    });

    it("returns number of active cubes after 6 cycles in 4d - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day17.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getActiveCubes4d(input);

      expect(actual).toBe(2136);
    });
  });
});
