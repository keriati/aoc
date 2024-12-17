import * as fs from "fs";
import * as path from "path";
import { getResult, getResultPart2 } from "../day17";

const input = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

describe("Advent of Code 2024", () => {
  describe("Day 17: Chronospatial Computer", () => {
    it("returns the program output", () => {
      const actual = getResult(input);

      expect(actual).toBe("4,6,3,5,6,3,5,2,1,0");
    });

    it("returns the program output - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day17.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput);

      expect(actual).toBe("1,7,6,5,1,0,5,0,7");
    });

    it("returns the initial A value", () => {
      const input = `Register A: 0
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`;
      const actual = getResultPart2(input);

      expect(actual).toBe(117440n);
    });

    it("returns the initial A value - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day17.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResultPart2(fileInput);

      expect(actual).toBe(236555995274861n);
    });
  });
});
