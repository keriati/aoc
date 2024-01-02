import * as fs from "fs";
import * as path from "path";
import { getSafeValue } from "../day23";

const input = `cpy 2 a
tgl a
tgl a
tgl a
cpy 1 a
dec a
dec a`;

describe("Advent of Code 2016", () => {
  describe("Day 23: Safe Cracking", () => {
    it("returns the value to be sent to the safe", () => {
      const actual = getSafeValue(input);

      expect(actual).toBe(3);
    });

    it("returns the value to be sent to the safe - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day23.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getSafeValue(fileInput);

      expect(actual).toBe(11975);
    });

    it("returns the value that should actually be sent to the safe - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day23.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getSafeValue(fileInput, 12);

      expect(actual).toBe(479008535);
    });
  });
});
