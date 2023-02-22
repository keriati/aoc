import { getResult } from "../day09";

describe("Advent of Code 2018", () => {
  describe("Day 09: Marble Mania", () => {
    it("returns the max score", () => {
      expect(getResult(9, 25)).toBe(32);
      expect(getResult(10, 1618)).toBe(8317);
      expect(getResult(21, 6111)).toBe(54718);
      expect(getResult(30, 5807)).toBe(37305);
      expect(getResult(13, 7999)).toBe(146373);
    });

    it("returns the max score - file input", () => {
      const actual = getResult(405, 70953);

      expect(actual).toBe(422980);
    });

    it("returns the max score 2 - file input", () => {
      const actual = getResult(405, 7095300);

      expect(actual).toBe(3552041936);
    });
  });
});
