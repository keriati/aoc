import * as fs from "fs";
import * as path from "path";
import { getResult } from "../day12";

const input = `0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2`;

describe("Advent of Code 2025", () => {
  describe("Day 12", () => {
    it("returns the result", () => {
      const actual = getResult(input);

      expect(actual).toBe(1);
    });

    it("returns the result - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day12.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput);

      expect(actual).toBe(451);
    });
  });
});
