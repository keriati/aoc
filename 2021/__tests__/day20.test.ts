import * as fs from "fs";
import * as path from "path";
import { getLitPixels, getLitPixels50 } from "../day20";

const input = `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###`;

describe("Advent of Code 2021", () => {
  describe("Day 20: Trench Map", () => {
    it("returns the result", () => {
      const actual = getLitPixels(input);

      expect(actual).toBe(35);
    });

    it("returns the result - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day20.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getLitPixels(fileInput);

      expect(actual).toBeLessThan(6063);
      expect(actual).toBeLessThan(5026);
      expect(actual).toBe(4928);
    });

    it("returns the result part 2", () => {
      const actual = getLitPixels50(input);

      expect(actual).toBe(3351);
    });

    it("returns the result part 2 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day20.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getLitPixels50(fileInput);

      expect(actual).toBe(16605);
    });
  });
});
