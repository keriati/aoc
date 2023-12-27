import * as fs from "fs";
import * as path from "path";
import { getRegisterValue } from "../day23";

const input = `inc a
jio a, +2
tpl a
inc a`;

describe("Advent of Code 2015", () => {
  describe("Day 23: Opening the Turing Lock", () => {
    it("returns the value of register a", () => {
      const actual = getRegisterValue(input);

      expect(actual.a).toBe(2);
    });

    it("returns the value of register a - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day23.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getRegisterValue(fileInput);

      expect(actual.b).toBe(184);
    });

    it("returns the value of register a when starting value is 1 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day23.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getRegisterValue(fileInput, 1);

      expect(actual.b).toBe(231);
    });
  });
});
