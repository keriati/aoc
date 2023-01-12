import * as fs from "fs";
import * as path from "path";
import { getBasementStep, getFloorNumber } from "../day01";

describe("Advent of Code 2015", () => {
  describe("Day 1: Not Quite Lisp", () => {
    it("returns the floor number", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day01.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getFloorNumber(input);

      expect(actual).toBe(74);
    });

    it("returns the step number when entering basement", () => {
      const actual = getBasementStep("()())");

      expect(actual).toBe(5);
    });

    it("returns the step number when entering basement - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day01.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getBasementStep(input);

      expect(actual).toBe(1795);
    });
  });
});
