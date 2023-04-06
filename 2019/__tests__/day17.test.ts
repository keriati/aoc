import * as fs from "fs";
import * as path from "path";
import { getAlignmentParams, getCollectedDust } from "../day17";

describe("Advent of Code 2019", () => {
  describe("Day 17: Set and Forget", () => {
    it("returns the sum of the alignment parameters - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day17.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getAlignmentParams(fileInput);

      expect(actual).toBe(2508);
    });

    it("returns the collected dust from the robot - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day17.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getCollectedDust(fileInput);

      expect(actual).toBe(799463);
    });
  });
});
