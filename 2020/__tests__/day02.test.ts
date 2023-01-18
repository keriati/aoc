import * as fs from "fs";
import * as path from "path";
import { getResult, getResult2, isValid, isValid2 } from "../day02";

describe("Advent of Code 2020", () => {
  describe("Day 02", () => {
    it("returns the result", () => {
      expect(isValid('abcde', '1-3 a')).toBe(true);
      expect(isValid('cdefg', '1-3 b')).toBe(false);
      expect(isValid('ccccccccc', '2-9 c')).toBe(true);
    });

    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day02.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual).toBe(398);
    });

    it("returns the result part 2", () => {
      expect(isValid2('abcde', '1-3 a')).toBe(true);
      expect(isValid2('cdefg', '1-3 b')).toBe(false);
      expect(isValid2('ccccccccc', '2-9 c')).toBe(false);
    });

    it("returns the result part 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day02.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult2(input);

      expect(actual).toBe(562);
    });
  });
});
