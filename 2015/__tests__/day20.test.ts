import {
  getPresentsCount,
  getHouseNumberWithPresents,
  getHouseNumberWithPresentsLazy,
} from "../day20";

describe("Advent of Code 2015", () => {
  describe("Day 20: Infinite Elves and Infinite Houses", () => {
    it("returns the number of presents", () => {
      expect(getPresentsCount(1)).toBe(10);
      expect(getPresentsCount(6)).toBe(120);
      expect(getPresentsCount(8)).toBe(150);
    });

    it("returns the lowest house number with given presents", () => {
      const actual = getHouseNumberWithPresents(36_000_000);

      expect(actual).toBe(831600);
    });

    it("returns the lowest house number with given presents lazy", () => {
      const actual = getHouseNumberWithPresentsLazy(36_000_000);

      expect(actual).toBe(884520);
    });
  });
});
