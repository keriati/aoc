import * as fs from "fs";
import * as path from "path";
import { getResultPart1, getResultPart2 } from "../day08";

describe("Advent of Code 2015", () => {
  describe("Day 08", () => {
    it("returns the result for example input", () => {
      const input = fs.readFileSync(
        path.resolve(__dirname, "../day08_example.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResultPart1(input);

      expect(actual).toBe(12);
    });

    it("returns the result for part 1", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day08.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResultPart1(input);

      expect(actual).toBe(1333);
    });

    it("returns the result for example input part 2", () => {
      const input = fs.readFileSync(
        path.resolve(__dirname, "../day08_example.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResultPart2(input);

      expect(actual).toBe(19);
    });

    it("returns the result for part 2", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day08.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResultPart2(input);

      expect(actual).toBe(2046);
    });
  });
});
