import * as fs from "fs";
import * as path from "path";
import { getInfections, getInfectionsEvolved } from "../day22";

const input = `..#
#..
...`;

describe("Advent of Code 2017", () => {
  describe("Day 22: Sporifica Virus", () => {
    it("returns the number of infections example 1", () => {
      const actual = getInfections(input, 7);

      expect(actual).toBe(5);
    });

    it("returns the number of infections example 2", () => {
      const actual = getInfections(input, 70);

      expect(actual).toBe(41);
    });

    it("returns the number of infections example 3", () => {
      const actual = getInfections(input, 10000);

      expect(actual).toBe(5587);
    });

    it("returns the number of infections - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day22.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getInfections(fileInput, 10000);

      expect(actual).toBeLessThan(5363);
      expect(actual).toBe(5196);
    });

    it("returns the number of infections when evolved", () => {
      const actual = getInfectionsEvolved(input, 100);

      expect(actual).toBe(26);
    });

    it("returns the number of infections when evolved - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day22.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getInfectionsEvolved(fileInput, 10_000_000);

      expect(actual).toBe(2511633);
    });
  });
});
