import * as fs from "fs";
import * as path from "path";
import { getMaxHappiness, getMaxHappinessWithMe } from "../day13";

const input = `Alice would gain 54 happiness units by sitting next to Bob.
Alice would lose 79 happiness units by sitting next to Carol.
Alice would lose 2 happiness units by sitting next to David.
Bob would gain 83 happiness units by sitting next to Alice.
Bob would lose 7 happiness units by sitting next to Carol.
Bob would lose 63 happiness units by sitting next to David.
Carol would lose 62 happiness units by sitting next to Alice.
Carol would gain 60 happiness units by sitting next to Bob.
Carol would gain 55 happiness units by sitting next to David.
David would gain 46 happiness units by sitting next to Alice.
David would lose 7 happiness units by sitting next to Bob.
David would gain 41 happiness units by sitting next to Carol.`;

describe("Advent of Code 2015", () => {
  describe("Day 13: Knights of the Dinner Table", () => {
    it("returns the maximum happiness", () => {
      const actual = getMaxHappiness(input);

      expect(actual).toBe(330);
    });

    it("returns the maximum happiness - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day13.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getMaxHappiness(fileInput);

      expect(actual).toBe(709);
    });

    it("returns the maximum happiness with me - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day13.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getMaxHappinessWithMe(fileInput);

      expect(actual).toBe(668);
    });
  });
});
