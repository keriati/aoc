import * as fs from "fs";
import * as path from "path";
import { countNice, countNicer, isNice, isNicer } from "../day5";

describe("Advent of Code 2015", () => {
  describe("Day 5: Doesn't He Have Intern-Elves For This?", () => {
    it("returns true for nice word 1", () => {
      const actual = isNice("ugknbfddgicrmopn");

      expect(actual).toBe(true);
    });

    it("returns true for nice word 2", () => {
      const actual = isNice("aaa");

      expect(actual).toBe(true);
    });

    it("returns false for naughty word", () => {
      const actual = isNice("jchzalrnumimnmhp");

      expect(actual).toBe(false);
    });

    it("returns false for naughty word 2", () => {
      const actual = isNice("haegwjzuvuyypxyu");

      expect(actual).toBe(false);
    });

    it("returns false for naughty word 3", () => {
      const actual = isNice("dvszwmarrgswjxmb");

      expect(actual).toBe(false);
    });

    it("returns the number of nice strings - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day5.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = countNice(input);

      expect(actual).toBe(255);
    });

    it("returns true for nicer word 1", () => {
      const actual = isNicer("qjhvhtzxzqqjkmpb");

      expect(actual).toBe(true);
    });

    it("returns true for nicer word 2", () => {
      const actual = isNicer("xxyxx");

      expect(actual).toBe(true);
    });

    it("returns false for naughtier word 1", () => {
      const actual = isNicer("uurcxstgmygtbstg");

      expect(actual).toBe(false);
    });

    it("returns false for naughtier word 2", () => {
      const actual = isNicer("ieodomkazucvgmuy");

      expect(actual).toBe(false);
    });

    it("returns the number of nicer strings - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day5.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = countNicer(input);

      expect(actual).toBe(55);
    });
  });
});
