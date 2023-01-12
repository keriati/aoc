import * as fs from "fs";
import * as path from "path";
import { getLength, getSquareFeet } from "../day02";

describe("Advent of Code 2015", () => {
  describe("Day 2: I Was Told There Would Be No Math", () => {
    it("returns the required square feet", () => {
      const actual = getSquareFeet("2x3x4");

      expect(actual).toBe(58);
    });

    it("returns the required square feet - from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day02.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getSquareFeet(input);

      expect(actual).toBe(1598415);
    });

    it("returns the required length of ribbon", () => {
      const actual = getLength("2x3x4");

      expect(actual).toBe(34);
    });

    it("returns the required length of ribbon - from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day02.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getLength(input);

      expect(actual).toBe(3812909);
    });
  });
});
