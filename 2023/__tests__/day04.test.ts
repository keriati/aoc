import * as fs from "fs";
import * as path from "path";
import { getCardPoints, getCardCount } from "../day04";

const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

describe("Advent of Code 2023", () => {
  describe("Day 04", () => {
    it("returns the points of winning cards", () => {
      const actual = getCardPoints(input);

      expect(actual).toBe(13);
    });

    it("returns the points of winning cards - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day04.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getCardPoints(fileInput);

      expect(actual).toBe(18653);
    });

    it("returns the number of cards", () => {
      const actual = getCardCount(input);

      expect(actual).toBe(30);
    });

    it("returns the number of cards - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day04.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getCardCount(fileInput);

      expect(actual).toBe(5921508);
    });
  });
});
