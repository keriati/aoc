import { getWinningElf, getWinningElfPart2 } from "../day19";

describe("Advent of Code 2016", () => {
  describe("Day 19: An Elephant Named Joseph", () => {
    it("returns the winning elf's number", () => {
      const actual = getWinningElf(`3001330`);

      expect(actual).toBe(1808357);
    });

    it("returns the winning elf's number part 2", () => {
      const actual = getWinningElfPart2(`3001330`);

      expect(actual).toBe(1407007);
    });
  });
});
