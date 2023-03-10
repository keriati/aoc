import { getFewestOfficeSteps, getMaxReachablePositionCount } from "../day13";

describe("Advent of Code 2016", () => {
  describe("Day 13: A Maze of Twisty Little Cubicles", () => {
    it("returns the fewest steps required to reach the position example", () => {
      const actual = getFewestOfficeSteps(10, 7, 4);

      expect(actual).toBe(11);
    });

    it("returns the fewest steps required to reach the position", () => {
      const actual = getFewestOfficeSteps(1358, 31, 39);

      expect(actual).toBe(96);
    });

    it("returns the maximum reachable positions in 50 steps", () => {
      const actual = getMaxReachablePositionCount(1358);

      expect(actual).toBe(141);
    });
  });
});
