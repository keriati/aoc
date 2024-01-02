import * as fs from "fs";
import * as path from "path";
import { getFewestSteps } from "../day24";

const input = `###########
#0.1.....2#
#.#######.#
#4.......3#
###########`;

describe("Advent of Code 2016", () => {
  describe("Day 24: Air Duct Spelunking", () => {
    it("returns the fewest number of steps", () => {
      const actual = getFewestSteps(input);

      expect(actual).toBe(14);
    });

    it("returns the fewest number of steps - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day24.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getFewestSteps(fileInput);

      expect(actual).toBe(518);
    });

    it("returns the fewest number of steps when returning to 0 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day24.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getFewestSteps(fileInput, true);

      expect(actual).toBe(716);
    });
  });
});
