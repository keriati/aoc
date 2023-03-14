import * as fs from "fs";
import * as path from "path";
import { getMaxCookieScore, getMaxCookieScoreSkinny } from "../day15";

const input = `Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`;

describe("Advent of Code 2015", () => {
  describe("Day 15: Science for Hungry People", () => {
    it("returns the best cookie score", () => {
      const actual = getMaxCookieScore(input);

      expect(actual).toBe(62_842_880);
    });

    it("returns the best cookie score - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day15.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getMaxCookieScore(fileInput);

      expect(actual).toBe(21_367_368);
    });

    it("returns the best cookie score when calories = 500", () => {
      const actual = getMaxCookieScoreSkinny(input);

      expect(actual).toBe(57_600_000);
    });

    it("returns the best cookie score when calories = 500 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day15.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getMaxCookieScoreSkinny(fileInput);

      expect(actual).toBe(1_766_400);
    });
  });
});
