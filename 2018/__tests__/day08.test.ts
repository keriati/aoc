import * as fs from "fs";
import * as path from "path";
import { getResult, getResult2 } from "../day08";

const input = `2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`;

describe("Advent of Code 2018", () => {
  describe("Day 08: Memory Maneuver", () => {
    it("returns the sum of all metadata entries", () => {
      const actual = getResult(input);

      expect(actual).toBe(138);
    });

    it("returns the sum of all metadata entries - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day08.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput);

      expect(actual).toBe(40977);
    });

    it("returns the value of the root node", () => {
      const actual = getResult2(input);

      expect(actual).toBe(66);
    });

    it("returns the value of the root node - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day08.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult2(fileInput);

      expect(actual).toBe(27490);
    });
  });
});
