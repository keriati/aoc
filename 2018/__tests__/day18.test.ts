import * as fs from "fs";
import * as path from "path";
import { getForestResourceValue, getForestResourceValueLong } from "../day18";

const input = `.#.#...|#.
.....#|##|
.|..|...#.
..|#.....#
#.#|||#|#|
...#.||...
.|....|...
||...#|.#|
|.||||..|.
...#.|..|.`;

describe("Advent of Code 2018", () => {
  describe("Day 18", () => {
    it("returns the resource value of the forest", () => {
      const actual = getForestResourceValue(input);

      expect(actual).toBe(1147);
    });

    it("returns the resource value of the forest - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day18.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getForestResourceValue(fileInput);

      expect(actual).toBe(543312);
    });

    it("returns the resource value of the forest after long time - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day18.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getForestResourceValueLong(fileInput);

      expect(actual).toBe(199064);
    });
  });
});
