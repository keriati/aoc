import {
  getPowerLevel,
  getTotalPowerLevel,
  getTotalPowerLevelVar,
} from "../day11";

describe("Advent of Code 2018", () => {
  describe("Day 11", () => {
    it("returns the result", () => {
      expect(getPowerLevel(122, 79, 57)).toBe(-5);
      expect(getPowerLevel(217, 196, 39)).toBe(0);
      expect(getPowerLevel(101, 153, 71)).toBe(4);
    });

    it("returns the 3x3 square with largest power level", () => {
      const actual = getTotalPowerLevel(3214);

      expect(actual).toEqual([21, 42]);
    });

    it("returns the square with largest power level", () => {
      const actual = getTotalPowerLevelVar(3214);

      expect(actual).toEqual([230, 212, 13]);
    });
  });
});
