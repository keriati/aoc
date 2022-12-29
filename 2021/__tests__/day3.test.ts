import * as fs from "fs";
import * as path from "path";
import { getResult, getResultPart2 } from "../day3";

describe("Advent of Code 2021", () => {
  describe("Day 3: Binary Diagnostic", () => {
    it("returns gamma rate * epsilon rate", () => {
      const input = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;
      const actual = getResult(input);

      expect(actual).toBe(198);
    });

    it("returns gamma rate * epsilon rate - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day3.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual).toBe(3148794);
    });

    it("returns oxygen rate * scrubber rate", () => {
      const input = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;
      const actual = getResultPart2(input);

      expect(actual).toBe(230);
    });

    it("returns oxygen rate * scrubber rate - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day3.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResultPart2(input);

      expect(actual).toBe(2795310);
    });
  });
});
