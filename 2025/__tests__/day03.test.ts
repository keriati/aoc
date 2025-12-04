import * as fs from "fs";
import * as path from "path";
import { getResult } from "../day03";

const input = `987654321111111
811111111111119
234234234234278
818181911112111`;

describe("Advent of Code 2025", () => {
  describe("Day 03", () => {
    it("returns the result", () => {
      const actual = getResult(input);

      expect(actual).toBe(357);
    });

    it("returns the result - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day03.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput);

      expect(actual).toBe(17179);
    });

    it("returns the result part 2", () => {
      const actual = getResult(input, 12);

      expect(actual).toBe(3121910778619);
    });

    it("returns the result part 2 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day03.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput, 12);

      expect(actual).toBe(170025781683941);
    });
  });
});
