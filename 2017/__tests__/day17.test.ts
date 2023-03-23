import { getSpinlockP1, getSpinlockP2 } from "../day17";

describe("Advent of Code 2017", () => {
  describe("Day 17: Spinlock", () => {
    it("returns the value after 2017", () => {
      const actual = getSpinlockP1(380, 2017);

      expect(actual).toBe(204);
    });

    it("returns the value after 0 after 50m rounds", () => {
      const actual = getSpinlockP2(380, 50_000_000);

      expect(actual).toBe(28954211);
    });
  });
});
