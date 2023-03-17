import * as fs from "fs";
import * as path from "path";
import { getGameScore, getElfWinScore } from "../day15";

describe("Advent of Code 2018", () => {
  describe("Day 15: Beverage Bandits", () => {
    it("returns the score for example 0 1", () => {
      const input = `#######
#E..G.#
#...#.#
#.G.#G#
#######`;

      const actual = getGameScore(input);

      expect(actual).toBe(16533);
    });

    it("returns the score for example 0 2", () => {
      const input = `#######
#.E...#
#.....#
#...G.#
#######`;

      const actual = getGameScore(input);

      expect(actual).toBe(136);
    });

    it("returns the score for example 0 3", () => {
      const input = `#########
#G..G..G#
#.......#
#.......#
#G..E..G#
#.......#
#.......#
#G..G..G#
#########`;

      const actual = getGameScore(input);

      expect(actual).toBe(27828);
    });

    it("returns the result 1", () => {
      const input = `#######
#.G...#
#...EG#
#.#.#G#
#..G#E#
#.....#
#######`;

      const actual = getGameScore(input);

      expect(actual).toBe(27730);
    });

    it("returns the score for example 2", () => {
      const input = `#######
#G..#E#
#E#E.E#
#G.##.#
#...#E#
#...E.#
#######`;

      const actual = getGameScore(input);

      expect(actual).toBe(36334);
    });

    it("returns the score for example 3", () => {
      const input = `#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`;

      const actual = getGameScore(input);

      expect(actual).toBe(39514);
    });

    it("returns the score for example 4", () => {
      const input = `#######
#E.G#.#
#.#G..#
#G.#.G#
#G..#.#
#...E.#
#######`;

      const actual = getGameScore(input);

      expect(actual).toBe(27755);
    });

    it("returns the score for example 5", () => {
      const input = `#######
#.E...#
#.#..G#
#.###.#
#E#G#G#
#...#G#
#######`;

      const actual = getGameScore(input);

      expect(actual).toBe(28944);
    });

    it("returns the score for example 6", () => {
      const input = `#########
#G......#
#.E.#...#
#..##..G#
#...##..#
#...#...#
#.G...G.#
#.....G.#
#########`;

      const actual = getGameScore(input);

      expect(actual).toBe(18740);
    });

    it("returns the score for file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day15.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getGameScore(fileInput);

      expect(actual).toBe(237490);
    });

    it("returns the score for part 2 example 1", () => {
      const input = `#######
#.G...#
#...EG#
#.#.#G#
#..G#E#
#.....#
#######`;

      const actual = getElfWinScore(input);

      expect(actual).toBe(4988);
    });

    xit("returns the score for part 2 example 2", () => {
      const input = `#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`;

      const actual = getElfWinScore(input);

      expect(actual).toBe(31284);
    });

    it("returns the score for part 2 example 3", () => {
      const input = `#######
#E.G#.#
#.#G..#
#G.#.G#
#G..#.#
#...E.#
#######`;

      const actual = getElfWinScore(input);

      expect(actual).toBe(3478);
    });

    it("returns the score for part 2 example 4", () => {
      const input = `#######
#.E...#
#.#..G#
#.###.#
#E#G#G#
#...#G#
#######`;

      const actual = getElfWinScore(input);

      expect(actual).toBe(6474);
    });

    it("returns the score for part 2 example 5", () => {
      const input = `#########
#G......#
#.E.#...#
#..##..G#
#...##..#
#...#...#
#.G...G.#
#.....G.#
#########`;

      const actual = getElfWinScore(input);

      expect(actual).toBe(1140);
    });

    it("returns the score for file input part 2", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day15.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getElfWinScore(fileInput);

      expect(actual).toBe(38424);
    });
  });
});
