import * as fs from "fs";
import * as path from "path";
import { getLightsOnCount } from "../day18";

describe("Advent of Code 2015", () => {
  describe("Day 18: Like a GIF For Your Yard", () => {
    it("returns number of lit lights - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day18.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getLightsOnCount(fileInput);

      expect(actual).toBe(821);
    });

    it("returns number of lit lights with stuck corners - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day18.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getLightsOnCount(fileInput, true);
      // 883 not
      expect(actual).toBe(886);
    });
  });
});
