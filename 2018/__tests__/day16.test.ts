import * as fs from "fs";
import * as path from "path";
import {
  getSampleMatches,
  getTestProgramResult,
  getOpsCodeMap,
} from "../day16";

const input = `Before: [3, 2, 1, 1]
9 2 1 2
After:  [3, 2, 2, 1]`;

describe("Advent of Code 2018", () => {
  describe("Day 16", () => {
    it("returns the number of samples matching 3 or more opcodes", () => {
      const actual = getSampleMatches(input);

      expect(actual).toBe(1);
    });

    it("returns the number of samples matching 3 or more opcodes - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day16.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getSampleMatches(fileInput);

      expect(actual).toBe(596);
    });

    it("returns the value from register 0 after executing the test program - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day16.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getTestProgramResult(fileInput);

      expect(actual).toBe(554);
    });
  });
});
