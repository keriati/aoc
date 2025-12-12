import * as fs from "fs";
import * as path from "path";
import { getResult, getResultPart2 } from "../day09";

const input = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

describe("Advent of Code 2025", () => {
  describe("Day 09", () => {
    it("returns the result", () => {
      const actual = getResult(input);

      expect(actual).toBe(50);
    });

    it("returns the result - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day09.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput);

      expect(actual).toBe(4748985168);
    });

    it("returns the result part 2", () => {
      const actual = getResultPart2(input);

      expect(actual).toBe(24);
    });

    it("returns the result part 2 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day09.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResultPart2(fileInput);

      expect(actual).toBe(1550760868);
    });
  });
});
