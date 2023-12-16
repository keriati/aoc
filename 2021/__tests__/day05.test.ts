import * as fs from "fs";
import * as path from "path";
import { getResult } from "../day05";

describe("Advent of Code 2021", () => {
  describe("Day 05: Hydrothermal Venture", () => {
    it("returns the result", () => {
      const input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;
      const actual = getResult(input, true);

      expect(actual).toBe(5);
    });

    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day05.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input, true);

      expect(actual).toBe(5084);
    });

    it("returns the result part 2", () => {
      const input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;
      const actual = getResult(input);

      expect(actual).toBe(12);
    });

    it("returns the result part 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day05.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual).toBe(17882);
    });
  });
});
