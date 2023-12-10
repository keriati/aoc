import * as fs from "fs";
import * as path from "path";
import { getMostSteps, getEnclosedTileCount } from "../day10";

const input = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;

const input2 = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`;

const inputPart21 = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`;

const inputPart22 = `..........
.S------7.
.|F----7|.
.||OOOO||.
.||OOOO||.
.|L-7F-J|.
.|II||II|.
.L--JL--J.
..........`;

describe("Advent of Code 2023", () => {
  describe("Day 10", () => {
    it("returns the number of steps need to the farthest position", () => {
      const actual = getMostSteps(input);

      expect(actual).toBe(4);
    });

    it("returns the number of steps need to the farthest position example 2", () => {
      const actual = getMostSteps(input2);

      expect(actual).toBe(8);
    });

    it("returns the number of steps need to the farthest position - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day10.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getMostSteps(fileInput);

      expect(actual).toBe(6828);
    });

    it("returns the number of tiles enclosed in the loop", () => {
      const actual = getEnclosedTileCount(inputPart21);

      expect(actual).toBe(4);
    });

    it("returns the number of tiles enclosed in the loop example 2", () => {
      const actual = getEnclosedTileCount(inputPart22);

      expect(actual).toBe(4);
    });

    it("returns the number of tiles enclosed in the loop - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day10.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getEnclosedTileCount(fileInput);

      expect(actual).toBeLessThan(464);
      expect(actual).not.toBe(48);
      expect(actual).toBe(459);
    });
  });
});
