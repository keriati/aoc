import { getResult, getResult2 } from "../day03";

describe("Advent of Code 2017", () => {
  describe("Day 03: Spiral Memory", () => {
    it("returns the Manhattan Distance", () => {
      const input = 325489;
      const actual = getResult(input);

      expect(actual).toBe(552);
    });

    it("returns the next larger value", () => {
      const input = 325489;
      const actual = getResult2(input);

      expect(actual).toBe(330785);
    });
  });
});
