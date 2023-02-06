import * as fs from "fs";
import * as path from "path";
import { getSumOfValues, getSumOfValuesV2 } from "../day14";

const input = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;

describe("Advent of Code 2020", () => {
  describe("Day 14: Docking Data", () => {
    it("returns the sum of all values in memory", () => {
      const actual = getSumOfValues(input);

      expect(actual).toBe(165);
    });

    it("returns the sum of all values in memory - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day14.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getSumOfValues(input);

      expect(actual).toBe(13556564111697);
    });

    it("returns the sum of all values in memory version 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day14.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getSumOfValuesV2(input);

      expect(actual).toBe(4173715962894);
    });
  });
});
