import * as fs from "fs";
import * as path from "path";
import { getFencingPrice, getFencingPriceNew } from "../day12";

const input = `AAAA
BBCD
BBCC
EEEC`;

const input2 = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`;

const input3 = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

describe("Advent of Code 2024", () => {
  describe("Day 12: Garden Groups", () => {
    it("returns the total price of fencing all regions", () => {
      const actual = getFencingPrice(input);

      expect(actual).toBe(140);
    });

    it("returns the total price of fencing all regions 2", () => {
      const actual = getFencingPrice(input2);

      expect(actual).toBe(772);
    });

    it("returns the total price of fencing all regions 3", () => {
      const actual = getFencingPrice(input3);

      expect(actual).toBe(1930);
    });

    it("the total price of fencing all regions - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day12.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getFencingPrice(fileInput);

      expect(actual).toBe(1304764);
    });

    it("returns the new total price of fencing all regions", () => {
      const actual = getFencingPriceNew(input);

      expect(actual).toBe(80);
    });

    it("returns the new total price of fencing all regions 2", () => {
      const actual = getFencingPriceNew(input2);

      expect(actual).toBe(436);
    });

    it("returns the new total price of fencing all regions 3", () => {
      const actual = getFencingPriceNew(input3);

      expect(actual).toBe(1206);
    });

    it("returns the new total price of fencing all regions 4", () => {
      const actual = getFencingPriceNew(`EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`);

      expect(actual).toBe(236);
    });

    it("returns the new total price of fencing all regions 5", () => {
      const actual = getFencingPriceNew(`AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`);

      expect(actual).toBe(368);
    });

    it("the new total price of fencing all regions - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day12.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getFencingPriceNew(fileInput);

      expect(actual).toBe(811148);
    });
  });
});
