import * as fs from "fs";
import * as path from "path";
import { getGuardPositions, getObstructionCount } from "../day06";

const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

describe("Advent of Code 2024", () => {
  describe("Day 06: Guard Gallivant", () => {
    it("returns the number of positions visited by the guard", () => {
      const actual = getGuardPositions(input);

      expect(actual).toBe(41);
    });

    it("returns the number of positions visited by the guard - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day06.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getGuardPositions(fileInput);

      expect(actual).toBe(4454);
    });

    it("returns the number of places worth obstructing", () => {
      const actual = getObstructionCount(input);

      expect(actual).toBe(6);
    });

    it("returns the number of places worth obstructing - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day06.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getObstructionCount(fileInput);

      expect(actual).toBe(1503);
    });
  });
});
