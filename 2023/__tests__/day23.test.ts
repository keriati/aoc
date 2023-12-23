import * as fs from "fs";
import * as path from "path";
import { getLongestHikeSlippery, getLongestHike } from "../day23";

const input = `#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#`;

describe("Advent of Code 2023", () => {
  describe("Day 23: A Long Walk", () => {
    it("returns the longest hike when slippery", () => {
      const actual = getLongestHikeSlippery(input);

      expect(actual).toBe(94);
    });

    it("returns the longest hike when slippery - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day23.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getLongestHikeSlippery(fileInput);

      expect(actual).toBe(2354);
    });

    it("returns the longest hike", () => {
      const actual = getLongestHike(input);

      expect(actual).toBe(154);
    });

    it("returns the longest hike - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day23.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getLongestHike(fileInput);

      expect(actual).toBe(6686);
    });
  });
});
