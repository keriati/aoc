import * as fs from "fs";
import * as path from "path";
import { getTotalWinnings, getTotalWinningsWithJoker } from "../day07";

const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

describe("Advent of Code 2023", () => {
  describe("Day 07", () => {
    it("returns the total winnings", () => {
      const actual = getTotalWinnings(input);

      expect(actual).toBe(6440);
    });

    it("returns the total winnings - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day07.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getTotalWinnings(fileInput);

      expect(actual).not.toBe(252044250);
      expect(actual).toBe(252295678);
    });

    it("returns the total winnings with jokers", () => {
      const actual = getTotalWinningsWithJoker(input);

      expect(actual).toBe(5905);
    });

    it("returns the total winnings with jokers - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day07.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getTotalWinningsWithJoker(fileInput);

      expect(actual).not.toBe(249146714);
      expect(actual).toBe(250577259);
    });
  });
});
