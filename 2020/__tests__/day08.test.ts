import * as fs from "fs";
import * as path from "path";
import { getAccValue, getAccValueFixed } from "../day08";

const input = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

describe("Advent of Code 2020", () => {
  describe("Day 08: Handheld Halting", () => {
    it("returns the result", () => {
      const actual = getAccValue(input);

      expect(actual).toBe(5);
    });

    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day08.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getAccValue(input);

      expect(actual).toBe(1941);
    });

    it("returns the result 2", () => {
      const actual = getAccValueFixed(input);

      expect(actual).toBe(8);
    });

    it("returns the result 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day08.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getAccValueFixed(input);

      expect(actual).toBe(2096);
    });
  });
});
