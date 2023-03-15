import { getRecipeScoreIndex, getScoreIndex } from "../day14";

describe("Advent of Code 2018", () => {
  describe("Day 14: Chocolate Charts", () => {
    it("returns the recipe scores index example", () => {
      const actual = getRecipeScoreIndex(9);

      expect(actual).toBe("5158916779");
    });

    it("returns recipe scores index part 1", () => {
      const actual = getRecipeScoreIndex(47801);

      expect(actual).toBe("1342316410");
    });

    it("returns index of recipe scores part 2 example 1", () => {
      const actual = getScoreIndex("51589");

      expect(actual).toBe(9);
    });

    it("returns index of recipe scores part 2 example 2", () => {
      const actual = getScoreIndex("01245");

      expect(actual).toBe(5);
    });

    it("returns index of recipe scores part 2 example 3", () => {
      const actual = getScoreIndex("92510");

      expect(actual).toBe(18);
    });

    it("returns index of recipe scores part 2 example 4", () => {
      const actual = getScoreIndex("59414");

      expect(actual).toBe(2018);
    });

    it("returns index of recipe scores part 2", () => {
      const actual = getScoreIndex("047801");

      expect(actual).toBe(20235230);
    });
  });
});
