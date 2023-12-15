import * as fs from "fs";
import * as path from "path";
import { getNearestLocation, getNearestLocationP2 } from "../day05";

const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

describe("Advent of Code 2023", () => {
  describe("Day 05: If You Give A Seed A Fertilizer", () => {
    it("returns the nearest location", () => {
      const actual = getNearestLocation(input);

      expect(actual).toBe(35);
    });

    it("returns the nearest location - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day05.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getNearestLocation(fileInput);

      expect(actual).not.toBe(400125159);
      expect(actual).toBe(323142486);
    });

    it("returns the nearest location part 2", () => {
      const actual = getNearestLocationP2(input);

      expect(actual).toBe(46);
    });

    it("returns the nearest location part 2 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day05.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getNearestLocationP2(fileInput);

      expect(actual).toBe(79874951);
    });
  });
});
