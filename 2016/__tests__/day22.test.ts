import * as fs from "fs";
import * as path from "path";
import { getViablePairs } from "../day22";

const input = ``;

describe("Advent of Code 2016", () => {
  describe("Day 22: Grid Computing", () => {
    it("returns the result - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day22.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getViablePairs(fileInput);

      expect(actual).toBe(1043);
    });
  });
});
