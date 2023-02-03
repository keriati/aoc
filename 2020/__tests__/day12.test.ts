import * as fs from "fs";
import * as path from "path";
import { getResult, getResult2 } from "../day12";

const input = `F10
N3
F7
R90
F11`;

describe("Advent of Code 2020", () => {
  describe("Day 12: Rain Risk", () => {
    it("returns the Manhattan distance", () => {
      const actual = getResult(input);

      expect(actual).toBe(25);
    });

    it("returns the Manhattan distance - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day12.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual).toBe(1687);
    });

    it("returns the Manhattan distance correctly", () => {
      const actual = getResult2(input);

      expect(actual).toBe(286);
    });

    it("returns the Manhattan distance correctly - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day12.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult2(input);

      expect(actual).toBe(20873);
    });
  });
});
