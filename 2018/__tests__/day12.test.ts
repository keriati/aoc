import * as fs from "fs";
import * as path from "path";
import { getPotSum20, getPotSum50b } from "../day12";

const input = `initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`;

describe("Advent of Code 2018", () => {
  describe("Day 12: Subterranean Sustainability", () => {
    it("returns the sum of pots - example", () => {
      const actual = getPotSum20(input);

      expect(actual).toBe(325);
    });

    it("returns the sum of pots after 20 generation - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day12.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getPotSum20(fileInput);

      expect(actual).toBe(3915);
    });

    it("returns the sum of path after 50b generations - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day12.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getPotSum50b(fileInput);

      expect(actual).toBe(4900000001793);
    });
  });
});
