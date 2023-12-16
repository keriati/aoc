import * as fs from "fs";
import * as path from "path";
import { getResult } from "../day06";

describe("Advent of Code 2021", () => {
  describe("Day 06: Lanternfish", () => {
    it("returns the result", () => {
      const input = `3,4,3,1,2`;
      const actual = getResult(input, 18);

      expect(actual).toBe(26);
    });

    it("returns the result", () => {
      const input = `3,4,3,1,2`;
      const actual = getResult(input, 80);

      expect(actual).toBe(5934);
    });

    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day06.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input, 80);

      expect(actual).toBe(355386);
    });

    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day06.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input, 256);

      expect(actual).toBe(1613415325809);
    });
  });
});
