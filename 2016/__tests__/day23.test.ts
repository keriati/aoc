import * as fs from "fs";
import * as path from "path";
import { getResult, getResultPart2 } from "../day23";

const input = `cpy 2 a
tgl a
tgl a
tgl a
cpy 1 a
dec a
dec a`;

describe("Advent of Code 2016", () => {
  describe("Day 23", () => {
    it("returns the result", () => {
      const actual = getResult(input);

      expect(actual).toBe(3);
    });

    it("returns the result - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day23.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput, 0);

      expect(actual).not.toBe(42);
      expect(actual).toBe(11975);
    });

    it("returns the result part 2 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day23.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput, 12);

      expect(actual).toBe(479008535);
    });
  });
});
