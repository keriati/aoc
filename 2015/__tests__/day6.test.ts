import * as fs from "fs";
import * as path from "path";
import { getLitLights, getTotalBrightness } from "../day6";

describe("Advent of Code 2015", () => {
  describe("Day 6", () => {
    it("returns the number of lit lights 1", () => {
      const input = `turn on 0,0 through 999,999`;

      const actual = getLitLights(input);

      expect(actual).toBe(1000000);
    });

    it("returns the number of lit lights 2", () => {
      const input = `toggle 0,0 through 999,0`;

      const actual = getLitLights(input);

      expect(actual).toBe(1000);
    });

    it("returns the number of lit lights 3", () => {
      const input = `toggle 0,0 through 999,0
toggle 10,0 through 19,0`;

      const actual = getLitLights(input);

      expect(actual).toBe(990);
    });

    it("returns the number of lit lights 4", () => {
      const input = `turn on 498,498 through 501,501
turn off 499,499 through 500,500`;

      const actual = getLitLights(input);

      expect(actual).toBe(12);
    });

    it("returns the number of lit lights - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day6.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getLitLights(input);

      expect(actual).toBe(569999);
    });

    it("returns the total brightness of lit lights - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day6.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getTotalBrightness(input);

      expect(actual).toBe(17836115);
    });
  });
});
