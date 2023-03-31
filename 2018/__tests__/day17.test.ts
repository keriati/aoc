import * as fs from "fs";
import * as path from "path";
import { getWaterTiles, getSettledWaterTiles } from "../day17";

const input = `x=495, y=2..7
y=7, x=495..501
x=501, y=3..7
x=498, y=2..4
x=506, y=1..2
x=498, y=10..13
x=504, y=10..13
y=13, x=498..504`;

describe("Advent of Code 2018", () => {
  describe("Day 17: Reservoir Research", () => {
    it("returns the number of tiles that the water can reach", () => {
      const actual = getWaterTiles(input);

      expect(actual).toBe(57);
    });

    it("returns the number of tiles that the water can reach - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day17.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getWaterTiles(fileInput);

      expect(actual).toBe(41027);
    });

    it("returns the number of tiles with settled water - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day17.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getSettledWaterTiles(fileInput);

      expect(actual).toBe(34214);
    });
  });
});
