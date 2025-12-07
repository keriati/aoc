import * as fs from "fs";
import * as path from "path";
import { getResult, getResultPart2 } from "../day06";

// prettier-ignore
const input =
  `123 328  51 64 \n` +
  ` 45 64  387 23 \n` +
  `  6 98  215 314\n` +
  `*   +   *   +  `;

describe("Advent of Code 2025", () => {
  describe("Day 06", () => {
    it("returns the result", () => {
      const actual = getResult(input);

      expect(actual).toBe(4277556);
    });

    it("returns the result - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day06.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput);

      expect(actual).toBe(4805473544166);
    });

    it("returns the result part 2", () => {
      const actual = getResultPart2(input);

      expect(actual).toBe(3263827);
    });

    it("returns the result part 2 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day06.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResultPart2(fileInput);

      expect(actual).toBe(8907730960817);
    });
  });
});
