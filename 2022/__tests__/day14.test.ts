import * as fs from "fs";
import * as path from "path";
import { getSand, getWorld, getMap } from "../day14";

const input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

describe("Advent of Code", () => {
  describe("Day 14", () => {
    it("creates the wall map", () => {
      const actual = getWorld(input.split("\n"));

      expect(actual).toEqual({
        "494,9": "#",
        "495,9": "#",
        "496,6": "#",
        "496,9": "#",
        "497,6": "#",
        "497,9": "#",
        "498,4": "#",
        "498,5": "#",
        "498,6": "#",
        "498,9": "#",
        "499,9": "#",
        "500,9": "#",
        "501,9": "#",
        "502,4": "#",
        "502,5": "#",
        "502,6": "#",
        "502,7": "#",
        "502,8": "#",
        "502,9": "#",
        "503,4": "#",
      });
    });

    it("prints the world", () => {
      const world = getWorld(input.split("\n"));

      const map = getMap(world);

      expect(map).toBe(
        "\n" +
          "0 ..........\n" +
          "1 ..........\n" +
          "2 ..........\n" +
          "3 ..........\n" +
          "4 ....#...##\n" +
          "5 ....#...#.\n" +
          "6 ..###...#.\n" +
          "7 ........#.\n" +
          "8 ........#.\n" +
          "9 #########."
      );
    });

    it("should return the world map - from file", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day14.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );
      const world = getWorld(fileInput.split("\n"));

      const map = getMap(world);

      console.log(map);
      expect(map).toHaveLength(10206);
    });

    it("returns the number of units of sand", () => {
      const actual = getSand(input);

      expect(actual).toEqual(24);
    });

    it("returns the number of units of sand - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day14.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getSand(fileInput);

      expect(actual).toEqual(805);
    });
  });
});
