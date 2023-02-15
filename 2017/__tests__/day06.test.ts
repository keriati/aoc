import * as fs from "fs";
import * as path from "path";
import { getResult } from "../day06";

describe("Advent of Code 2017", () => {
  describe("Day 06: Memory Reallocation", () => {
    it("returns the number of redistribution cycles", () => {
      const input = `0 2 7 0`;
      const actual = getResult(input);

      expect(actual[0]).toBe(5);
    });

    it("returns the number of redistribution cycles - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day06.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual[0]).toBe(4074);
    });

    it("returns the number of redistribution cycles part 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day06.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual[1]).toBe(2793);
    });
  });
});
