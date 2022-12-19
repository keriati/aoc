import * as fs from "fs";
import * as path from "path";
import { getCrtOutput, getSignalStrength } from "../day10";

const crtResult1 = `
##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....
`;

const crtResult2 = `
###..#....#..#.#....#..#.###..####.#..#.
#..#.#....#..#.#....#.#..#..#....#.#..#.
#..#.#....#..#.#....##...###....#..####.
###..#....#..#.#....#.#..#..#..#...#..#.
#....#....#..#.#....#.#..#..#.#....#..#.
#....####..##..####.#..#.###..####.#..#.
`;

describe("Advent of Code", () => {
  describe("Day 10", () => {
    it("returns signal strength from file1", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day10_1.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getSignalStrength(input);

      expect(actual).toEqual(13140);
    });
    it("returns signal strength from file2", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day10_2.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getSignalStrength(input);

      expect(actual).toEqual(14240);
    });

    it("returns crt output", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day10_1.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getCrtOutput(input);

      expect(actual).toEqual(crtResult1);
    });

    it("returns crt output2", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day10_2.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getCrtOutput(input);

      expect(actual).toEqual(crtResult2);
    });
  });
});
