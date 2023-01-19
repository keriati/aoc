import * as fs from "fs";
import * as path from "path";
import { getResult, getResult2 } from "../day01";

describe("Advent of Code 2018", () => {
  describe("Day 01", () => {
    it("returns the frequency", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day01.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual).toBe(599);
    });

    it("returns the frequency reached twice", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day01.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult2(input);

      expect(actual).toBe(81204);
    });
  });
});
