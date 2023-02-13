import * as fs from "fs";
import * as path from "path";
import { getValidPasswords, getValidPasswordNoAna } from "../day04";

describe("Advent of Code 2017", () => {
  describe("Day 04: High-Entropy Passphrases", () => {
    it("returns the number of valid passwords", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day04.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getValidPasswords(input);

      expect(actual).toBe(383);
    });

    it("returns the number of valid passwords that have no anagrams", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day04.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getValidPasswordNoAna(input);

      expect(actual).toBe(265);
    });
  });
});
