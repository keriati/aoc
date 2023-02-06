import * as fs from "fs";
import * as path from "path";
import {
  getValidPasswords,
  getValidTobogganPasswords,
  isValid,
  isValidTobogan,
} from "../day02";

describe("Advent of Code 2020", () => {
  describe("Day 02: Password Philosophy", () => {
    it("returns whether the password is valid or not", () => {
      expect(isValid("abcde", "1-3 a")).toBe(true);
      expect(isValid("cdefg", "1-3 b")).toBe(false);
      expect(isValid("ccccccccc", "2-9 c")).toBe(true);
    });

    it("returns the number of valid passwords - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day02.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getValidPasswords(input);

      expect(actual).toBe(398);
    });

    it("returns whether the password is valid or not - part 2", () => {
      expect(isValidTobogan("abcde", "1-3 a")).toBe(true);
      expect(isValidTobogan("cdefg", "1-3 b")).toBe(false);
      expect(isValidTobogan("ccccccccc", "2-9 c")).toBe(false);
    });

    it("returns the number of valid passwords - part 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day02.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getValidTobogganPasswords(input);

      expect(actual).toBe(562);
    });
  });
});
