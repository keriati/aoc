import { getNumberSpoken } from "../day15";

describe("Advent of Code 2020", () => {
  describe("Day 15: Rambunctious Recitation", () => {
    it("returns the result", () => {
      expect(getNumberSpoken(`0,3,6`, 2020)).toBe(436);
      expect(getNumberSpoken(`5,1,9,18,13,8,0`, 2020)).toBe(376);
      expect(getNumberSpoken(`5,1,9,18,13,8,0`, 30000000)).toBe(323780);
    });
  });
});
