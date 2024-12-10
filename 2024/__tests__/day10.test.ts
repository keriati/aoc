import * as fs from "fs";
import * as path from "path";
import { getTHScore, getTHRating } from "../day10";

const input = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

describe("Advent of Code 2024", () => {
  describe("Day 10: Hoof It", () => {
    it("the sum of the scores of all trailheads", () => {
      const actual = getTHScore(input);

      expect(actual).toBe(36);
    });

    it("the sum of the scores of all trailheads - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day10.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getTHScore(fileInput);

      expect(actual).toBe(552);
    });

    it("the sum of the ratings of all trailheads", () => {
      const actual = getTHRating(input);

      expect(actual).toBe(81);
    });

    it("the sum of the ratings of all trailheads - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day10.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getTHRating(fileInput);

      expect(actual).toBe(1225);
    });
  });
});
