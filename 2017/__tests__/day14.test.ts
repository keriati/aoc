import { getRegionCount, getSquareCount } from "../day14";

describe("Advent of Code 2017", () => {
  describe("Day 14: Disk Defragmentation", () => {
    it("returns the number of squares", () => {
      const actual = getSquareCount(`flqrgnkx`);

      expect(actual).toBe(8108);
    });

    it("returns the number of squares - file input", () => {
      const actual = getSquareCount(`vbqugkhl`);

      expect(actual).toBe(8148);
    });

    it("returns the number of regions", () => {
      const actual = getRegionCount(`flqrgnkx`);

      expect(actual).toBe(1242);
    });

    it("returns the number of regions - file input", () => {
      const actual = getRegionCount(`vbqugkhl`);

      expect(actual).toBe(1180);
    });
  });
});
