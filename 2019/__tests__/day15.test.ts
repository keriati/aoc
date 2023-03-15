import * as fs from "fs";
import * as path from "path";
import { getOxygenStats } from "../day15";

describe("Advent of Code 2019", () => {
  describe("Day 15: Oxygen System", () => {
    it("returns the min steps to the oxygen system and the minutes to fill with oxygen - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day15.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getOxygenStats(fileInput);

      expect(actual).toEqual([266, 274]);
    });
  });
});
