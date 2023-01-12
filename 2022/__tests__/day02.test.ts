import * as fs from "fs";
import * as path from "path";
import { getScore, getScore2 } from "../day02";

const testInput = `A Y
B X
C Z`;

describe("Advent of Code", () => {
  describe("Day 2", () => {
    it("returns your score", () => {
      const actual = getScore(testInput);

      expect(actual).toBe(15);
    });

    it("returns your score file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day02.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getScore(input);

      expect(actual).toBe(12458);
    });

    it("returns your score 2", () => {
      const actual = getScore2(testInput);

      expect(actual).toBe(12);
    });

    it("returns your score 2 file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day02.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getScore2(input);

      expect(actual).toBe(12683);
    });
  });
});
