import { getValidPasswords, getValidPasswords2 } from "../day04";

describe("Advent of Code 2019", () => {
  describe("Day 04: Secure Container", () => {
    it("returns the number of valid passwords", () => {
      const actual = getValidPasswords(183564, 657474);

      expect(actual).toBe(1610);
    });

    it("returns the number of valid passwords part 2", () => {
      const actual = getValidPasswords2(183564, 657474);

      expect(actual).toBe(1104);
    });
  });
});
