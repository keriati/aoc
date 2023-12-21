import * as fs from "fs";
import * as path from "path";
import { getPlotsCount, getPlotsCountBig } from "../day21";

const input = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`;

describe("Advent of Code 2023", () => {
  describe("Day 21: Step Counter", () => {
    it("returns the number of garden plots", () => {
      const actual = getPlotsCount(input);

      expect(actual).toBe(16);
    });

    it("returns the number of garden plots - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day21.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getPlotsCount(fileInput, 64);

      expect(actual).toBe(3746);
    });

    it("returns the number of garden plots in a big garden - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day21.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getPlotsCountBig(fileInput, 26501365);

      expect(actual).toBe(623540829615589);
    });
  });
});
