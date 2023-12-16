import { Area, fireProbe, getHighestShot, getHitCount } from "../day17";

// target area: x=20..30, y=-10..-5
// target area: x=207..263, y=-115..-63

describe("Advent of Code 2021", () => {
  describe("Day 17: Trick Shot", () => {
    it("returns true for test case 1", () => {
      const target: Area = [
        [20, -5],
        [30, -10],
      ];
      const actual = fireProbe([7, 2], target);

      expect(actual[0]).toBe(true);
    });

    it("returns true for test case 2", () => {
      const target: Area = [
        [20, -5],
        [30, -10],
      ];
      const actual = fireProbe([6, 3], target);

      expect(actual[0]).toBe(true);
    });

    it("returns true for test case 3", () => {
      const target: Area = [
        [20, -5],
        [30, -10],
      ];
      const actual = fireProbe([9, 0], target);

      expect(actual[0]).toBe(true);
    });

    it("returns false for test case 4", () => {
      const target: Area = [
        [20, -5],
        [30, -10],
      ];
      const actual = fireProbe([17, -4], target);

      expect(actual[0]).toBe(false);
    });

    it("returns the result for example", () => {
      const input: Area = [
        [20, -5],
        [30, -10],
      ];
      const actual = getHighestShot(input);

      expect(actual).toBe(45);
    });

    it("returns the result for Part 1", () => {
      const input: Area = [
        [207, -63],
        [263, -115],
      ];

      const actual = getHighestShot(input);

      expect(actual).toBe(6555);
    });

    it("returns the result for Part 2", () => {
      const input: Area = [
        [207, -63],
        [263, -115],
      ];

      const actual = getHitCount(input);

      expect(actual).toBe(4973);
    });
  });
});
