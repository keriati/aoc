import * as fs from "fs";
import * as path from "path";
import { getResult } from "../day12";

const input = `cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`;

describe("Advent of Code 2016", () => {
  describe("Day 12: Leonardo's Monorail", () => {
    it("returns the value of the a register example", () => {
      const actual = getResult(input);

      expect(actual).toBe(42);
    });

    it("returns the value of the a register - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day12.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput);

      expect(actual).toBe(318077);
    });

    it("returns the value of the a register when c inits with 1 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day12.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput, 1);

      expect(actual).toBe(9227731);
    });
  });
});
