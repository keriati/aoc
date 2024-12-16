import * as fs from "fs";
import * as path from "path";
import { getLowestScore, getTileCount } from "../day16";

const input = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;

const input2 = `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`;

describe("Advent of Code 2024", () => {
  describe("Day 16: Reindeer Maze", () => {
    it("returns the lowest score", () => {
      const actual = getLowestScore(input);

      expect(actual).toBe(7036);
    });

    it("returns returns the lowest score input 2", () => {
      const actual = getLowestScore(input2);

      expect(actual).toBe(11048);
    });

    it("returns the lowest score - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day16.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getLowestScore(fileInput);

      expect(actual).toBe(88468);
    });

    it("returns the number of tiles", () => {
      const actual = getTileCount(input);

      expect(actual).toBe(45);
    });

    it("returns the number of tiles input 2", () => {
      const actual = getTileCount(input2);

      expect(actual).toBe(64);
    });

    it("returns the number of tiles - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day16.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getTileCount(fileInput);

      expect(actual).toBe(616);
    });
  });
});
