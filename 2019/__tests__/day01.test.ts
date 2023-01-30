import * as fs from "fs";
import * as path from "path";
import { getFuelRequired, getTotalFuelRequired } from "../day01";

describe("Advent of Code 2019", () => {
  describe("Day 01: The Tyranny of the Rocket Equation", () => {
    it("returns the fuel required", () => {
      expect(getFuelRequired("12")).toBe(2);
      expect(getFuelRequired("14")).toBe(2);
      expect(getFuelRequired("1969")).toBe(654);
      expect(getFuelRequired("100756")).toBe(33583);
    });

    it("returns the fuel required - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day01.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getFuelRequired(input);

      expect(actual).toBe(3287620);
    });

    it("returns the fuel required for fuel too", () => {
      expect(getTotalFuelRequired("12")).toBe(2);
      expect(getTotalFuelRequired("14")).toBe(2);
      expect(getTotalFuelRequired("1969")).toBe(966);
      expect(getTotalFuelRequired("100756")).toBe(50346);
    });

    it("returns the fuel required for fuel too - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day01.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getTotalFuelRequired(input);

      expect(actual).toBe(4928567);
    });
  });
});
