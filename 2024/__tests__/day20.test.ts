import * as fs from "fs";
import * as path from "path";
import { getCheatsCount } from "../day20";

const input = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;

describe("Advent of Code 2024", () => {
  describe("Day 20: Race Condition", () => {
    it("returns the number of cheats that would save you 64 picoseconds", () => {
      const actual = getCheatsCount(input, 2, 64);

      expect(actual).toBe(1);
    });

    it("returns the number of cheats that would save you at least 100 picoseconds - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day20.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getCheatsCount(fileInput, 2);

      expect(actual).toBe(1399);
    });

    it("returns the number of cheats that would save you at least 74 picoseconds with maxCheats 20", () => {
      const actual = getCheatsCount(input, 20, 74);

      expect(actual).toBe(7);
    });

    it("returns the number of cheats that would save you at least 100 picoseconds with maxCheats 20 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day20.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getCheatsCount(fileInput);

      expect(actual).toBe(994807);
    });
  });
});
