import * as fs from "fs";
import * as path from "path";
import { getResult, getResultPart2 } from "../day05";

const input = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

describe("Advent of Code 2025", () => {
  describe("Day 05", () => {
    it("returns the result", () => {
      const actual = getResult(input);

      expect(actual).toBe(3);
    });

    it("returns the result - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day05.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput);

      expect(actual).toBe(652);
    });

    it("returns the result part 2", () => {
      const actual = getResultPart2(input);

      expect(actual).toBe(14);
    });

    it("returns the result part 2 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day05.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResultPart2(fileInput);

      expect(actual).toBe(341753674214273);
    });
  });
});
