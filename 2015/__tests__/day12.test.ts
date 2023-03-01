import * as fs from "fs";
import * as path from "path";
import { getNumberSum, getNotRedSum } from "../day12";

describe("Advent of Code 2015", () => {
  describe("Day 12: JSAbacusFramework.io", () => {
    it("returns the sum of all numbers - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day12.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getNumberSum(fileInput);

      expect(actual).toBe(111754);
    });

    it("returns the sum of not red numbers", () => {
      expect(getNotRedSum(`[1,2,3]`)).toBe(6);
      expect(getNotRedSum(`[1,{"c":"red","b":2},{"a":2},3]`)).toBe(6);
      expect(getNotRedSum(`{"d":"red","e":[1,2,3,4],"f":5}`)).toBe(0);
      expect(getNotRedSum(`[1,"red",5]`)).toBe(6);
      expect(getNotRedSum(`[-11,"red",5]`)).toBe(-6);
      expect(getNotRedSum(`[-11,"red",50]`)).toBe(39);
    });

    it("returns the sum of not red numbers - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day12.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getNotRedSum(fileInput);

      expect(actual).toBe(65402);
    });
  });
});
