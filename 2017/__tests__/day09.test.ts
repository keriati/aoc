import * as fs from "fs";
import * as path from "path";
import { getGarbageScore } from "../day09";

describe("Advent of Code 2017", () => {
  describe("Day 09: Stream Processing", () => {
    it("returns the score", () => {
      expect(getGarbageScore(`<>`)[0]).toBe(0);
      expect(getGarbageScore(`{{{}}}`)[0]).toBe(6);
      expect(getGarbageScore(`{{},{}}`)[0]).toBe(5);
      expect(getGarbageScore(`{{{},{},{{}}}}`)[0]).toBe(16);
      expect(getGarbageScore(`{<a>,<a>,<a>,<a>}`)[0]).toBe(1);
      expect(getGarbageScore(`{{<ab>},{<ab>},{<ab>},{<ab>}}`)[0]).toBe(9);
      expect(getGarbageScore(`{{<!!>},{<!!>},{<!!>},{<!!>}}`)[0]).toBe(9);
      expect(getGarbageScore(`{{<a!>},{<a!>},{<a!>},{<ab>}}`)[0]).toBe(3);
    });

    it("returns the score - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day09.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getGarbageScore(fileInput);

      expect(actual[0]).toBe(9662);
    });

    it("returns the number of garbage - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day09.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getGarbageScore(fileInput);

      expect(actual[1]).toBe(4903);
    });
  });
});
