import * as fs from "fs";
import * as path from "path";
import { getResult } from "../day09";

describe("Advent of Code 2015", () => {
  describe("Day 09", () => {
    it("returns the result", () => {
      const input = `London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`;
      const actual = getResult(input);

      expect(actual[0]).toBe(605);
    });

    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day09.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual[0]).toBe(207);
    });

    it("returns the result part 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day09.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual[1]).toBe(804);
    });
  });
});
