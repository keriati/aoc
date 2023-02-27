import { getKnotResult, getKnotHash } from "../day10";

describe("Advent of Code 2017", () => {
  describe("Day 10: Knot Hash", () => {
    it("returns the first two numbers multiplied example", () => {
      const actual = getKnotResult(5, [3, 4, 1, 5]);

      expect(actual).toBe(12);
    });

    it("returns the first two numbers multiplied", () => {
      const actual = getKnotResult(
        256,
        [199, 0, 255, 136, 174, 254, 227, 16, 51, 85, 1, 2, 22, 17, 7, 192]
      );

      expect(actual).toBe(3770);
    });

    it("returns the hash example 1", () => {
      const actual = getKnotHash(`1,2,3`);

      expect(actual).toBe("3efbe78a8d82f29979031a4aa0b16a9d");
    });

    it("returns the hash example 2", () => {
      const actual = getKnotHash(`1,2,4`);

      expect(actual).toBe("63960835bcdc130f0b66d7ff4f6a5a8e");
    });

    it("returns the hash example 3", () => {
      const actual = getKnotHash(`AoC 2017`);

      expect(actual).toBe("33efeb34ea91902bb2f59c9920caa6cd");
    });

    it("returns the hash", () => {
      const actual = getKnotHash(
        `199,0,255,136,174,254,227,16,51,85,1,2,22,17,7,192`
      );

      expect(actual).toBe("a9d0e68649d0174c8756a59ba21d4dc6");
    });
  });
});
