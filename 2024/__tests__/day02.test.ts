import * as fs from "fs";
import * as path from "path";
import { getSafeReports, getSafeReportsThisIsFine } from "../day02";

const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

describe("Advent of Code 2024", () => {
  describe("Day 02: Red-Nosed Reports", () => {
    it("returns the number of safe reports", () => {
      const actual = getSafeReports(input);

      expect(actual).toBe(2);
    });

    it("returns the number of safe reports - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day02.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getSafeReports(fileInput);

      expect(actual).toBe(246);
    });

    it("returns the number of safe reports with tolerated errors", () => {
      const actual = getSafeReportsThisIsFine(input);

      expect(actual).toBe(4);
    });

    it("returns the number of safe reports with tolerated errors - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day02.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getSafeReportsThisIsFine(fileInput);

      expect(actual).toBe(318);
    });
  });
});
