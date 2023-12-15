import * as fs from "fs";
import * as path from "path";
import {
  getLoad,
  getNorthSupportBeamsLoad,
  getLoadAfterCycles,
} from "../day14";

const inputLoadCheck = `OOOO.#.O..
OO..#....#
OO..O##..O
O..#.OO...
........#.
..#....#.#
..O..#.O.O
..O.......
#....###..
#....#....`;

const input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

describe("Advent of Code 2023", () => {
  describe("Day 14: Parabolic Reflector Dish", () => {
    it("returns the load from a map", () => {
      const actual = getLoad(
        inputLoadCheck.split("\n").map((line) => line.split(""))
      );

      expect(actual).toBe(136);
    });

    it("returns the total load of the north support beams", () => {
      const actual = getNorthSupportBeamsLoad(input);

      expect(actual).toBe(136);
    });

    it("returns the total load of the north support beams - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day14.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getNorthSupportBeamsLoad(fileInput);

      expect(actual).toBe(108759);
    });

    it("returns the total load of the north support beams after cycles", () => {
      const actual = getLoadAfterCycles(input);

      expect(actual).toBe(64);
    });

    it("returns the total load of the north support beams after cycles - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day14.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getLoadAfterCycles(fileInput);

      expect(actual).not.toBe(97561);
      expect(actual).toBe(89089);
    });
  });
});
