import * as fs from "fs";
import * as path from "path";
import { getPossibleGamesCount, getMinimumSetPower } from "../day02";

const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

describe("Advent of Code 2023", () => {
  describe("Day 02: Cube Conundrum", () => {
    it("returns the number of possible games", () => {
      const actual = getPossibleGamesCount(input);

      expect(actual).toBe(8);
    });

    it("returns the number of valid games - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day02.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getPossibleGamesCount(fileInput);

      expect(actual).toBe(2176);
    });

    it("returns the sum of game power", () => {
      const actual = getMinimumSetPower(input);

      expect(actual).toBe(2286);
    });

    it("returns the sum of game power - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day02.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getMinimumSetPower(fileInput);

      expect(actual).toBe(63700);
    });
  });
});
