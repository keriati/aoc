import * as fs from "fs";
import * as path from "path";
import { getSignalValue } from "../day25";

describe("Advent of Code 2016", () => {
  describe("Day 25: Clock Signal", () => {
    it("returns the right value for the signal - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day25.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getSignalValue(fileInput);

      expect(actual).toBe(175);
    });
  });
});
