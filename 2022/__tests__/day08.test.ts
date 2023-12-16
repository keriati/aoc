import * as fs from "fs";
import * as path from "path";
import { getBestScenicScore, getVisibleTreeCount } from "../day08";

const testInput = `30373
25512
65332
33549
35390`;

describe("Advent of Code", () => {
  describe("Day 8: Treetop Tree House", () => {
    it("returns number of visible trees", () => {
      const actual = getVisibleTreeCount(testInput);

      expect(actual).toEqual(21);
    });

    it("returns number of visible trees from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day08.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getVisibleTreeCount(input);

      expect(actual).toEqual(1870);
    });

    it("returns the best scenic score", () => {
      const actual = getBestScenicScore(testInput);

      expect(actual).toEqual(8);
    });

    it("returns the best scenic score from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day08.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getBestScenicScore(input);

      expect(actual).toEqual(517440);
    });
  });
});
