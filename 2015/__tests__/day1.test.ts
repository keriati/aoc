import * as fs from "fs";
import * as path from "path";
import { getBasementStep, getFloorNumber } from "../day1";

describe("Advent of Code 2015", () => {
  describe("Day 1", () => {
    it("should return the floor number", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day1.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getFloorNumber(input);

      expect(actual).toBe(74);
    });

    it("should return the step number when entering basement", () => {
      const actual = getBasementStep("()())");

      expect(actual).toBe(5);
    });

    it("should return the step number when entering basement - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day1.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getBasementStep(input);

      expect(actual).toBe(1795);
    });
  });
});
