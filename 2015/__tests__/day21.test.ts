import { getLeastGold, getMostGold } from "../day21";

describe("Advent of Code 2015", () => {
  describe("Day 21: RPG Simulator 20XX", () => {
    it("returns the least amount of gold to spend to win", () => {
      const actual = getLeastGold(103, 9, 2);

      expect(actual).toBe(121);
    });

    it("returns the most amount of gold to spend to still lose", () => {
      const actual = getMostGold(103, 9, 2);

      expect(actual).toBe(201);
    });
  });
});
