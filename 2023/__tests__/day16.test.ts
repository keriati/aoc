import * as fs from "fs";
import * as path from "path";
import { getEnergizedTiles, getMaxEnergizedTiles } from "../day16";

const input = `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`;

describe("Advent of Code 2023", () => {
  describe("Day 16: The Floor Will Be Lava", () => {
    it("returns the number of energized tiles", () => {
      const actual = getEnergizedTiles(input);

      expect(actual).toBe(46);
    });

    it("returns the number of energized tiles - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day16.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getEnergizedTiles(fileInput);

      expect(actual).toBe(8551);
    });

    it("returns the number of max energized tiles", () => {
      const actual = getMaxEnergizedTiles(input);

      expect(actual).toBe(51);
    });

    it("returns the number of max energized tiles - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day16.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getMaxEnergizedTiles(fileInput);

      expect(actual).toBe(8754);
    });
  });
});
