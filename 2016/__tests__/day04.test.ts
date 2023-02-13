import * as fs from "fs";
import * as path from "path";
import { getResult, getResult2 } from "../day04";

describe("Advent of Code 2016", () => {
  describe("Day 04: Security Through Obscurity", () => {
    it("returns the sum of the sector IDs of the real rooms", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day04.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual).toBe(278221);
    });

    it("returns sector ID of the room where North Pole objects are stored", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day04.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult2(input);

      expect(actual).toBe(267);
    });
  });
});
