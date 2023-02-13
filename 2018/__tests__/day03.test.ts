import * as fs from "fs";
import * as path from "path";
import { getOverlappingSquares, getNonOverlappingId } from "../day03";

describe("Advent of Code 2018", () => {
  describe("Day 03: No Matter How You Slice It", () => {
    it("returns the number of square inches of fabric with two or more claims", () => {
      const input = `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`;
      const actual = getOverlappingSquares(input);

      expect(actual).toBe(4);
    });

    it("returns the number of square inches of fabric with two or more claims - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day03.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getOverlappingSquares(input);

      expect(actual).toBe(118223);
    });

    it("returns the only claim id with no overlaps", () => {
      const input = `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`;
      const actual = getNonOverlappingId(input);

      expect(actual).toBe("3");
    });

    it("returns the only claim id with no overlaps - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day03.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getNonOverlappingId(input);

      expect(actual).toBe("412");
    });
  });
});
