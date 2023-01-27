import * as fs from "fs";
import * as path from "path";
import { getAnyYesCount, getEveryYesCount } from "../day06";

const input = `abc

a
b
c

ab
ac

a
a
a
a

b`;

describe("Advent of Code 2020", () => {
  describe("Day 06 Custom Customs", () => {
    it("returns the number of questions anyone answered with yes", () => {
      const actual = getAnyYesCount(input);

      expect(actual).toBe(11);
    });

    it("returns the number of questions anyone answered with yes - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day06.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getAnyYesCount(input);

      expect(actual).toBe(6703);
    });

    it("returns the number of questions everyone answered with yes", () => {
      const actual = getEveryYesCount(input);

      expect(actual).toBe(6);
    });

    it("returns the number of questions everyone answered with yes - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day06.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getEveryYesCount(input);

      expect(actual).toBe(3430);
    });
  });
});
