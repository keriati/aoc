import * as fs from "fs";
import * as path from "path";
import { getAuntNumber, getAuntNumberPart2 } from "../day16";

describe("Advent of Code 2015", () => {
  describe("Day 16: Aunt Sue", () => {
    it("returns the number of the Aunt", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day16.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getAuntNumber(fileInput);

      expect(actual).toBe(40);
    });

    it("returns the correct number of the Aunt", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day16.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getAuntNumberPart2(fileInput);

      expect(actual).toBe(241);
    });
  });
});
