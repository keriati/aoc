import * as fs from "fs";
import * as path from "path";
import { getListDistance, getSimilarityScore } from "../day01";

const input = `3   4
4   3
2   5
1   3
3   9
3   3`;

describe("Advent of Code 2024", () => {
  describe("Day 01: Historian Hysteria", () => {
    it("returns the distance between the lists", () => {
      const actual = getListDistance(input);

      expect(actual).toBe(11);
    });

    it("returns the distance between the lists - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day01.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getListDistance(fileInput);

      expect(actual).toBe(1651298);
    });

    it("returns the similarity score", () => {
      const actual = getSimilarityScore(input);

      expect(actual).toBe(31);
    });

    it("returns the similarity score - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day01.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getSimilarityScore(fileInput);

      expect(actual).toBe(21306195);
    });
  });
});
