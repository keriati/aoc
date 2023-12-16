import * as fs from "fs";
import * as path from "path";
import { getGroupPriorities, getPriorities } from "../day03";

const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

describe("Advent of Code", () => {
  describe("Day 3: Rucksack Reorganization", () => {
    it("returns the priorities", () => {
      const actual = getPriorities(testInput);

      expect(actual).toBe(157);
    });

    it("returns the priorities from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day03.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getPriorities(input);

      expect(actual).toBe(8243);
    });

    it("returns the group priorities", () => {
      const actual = getGroupPriorities(testInput);

      expect(actual).toBe(70);
    });

    it("returns the group priorities from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day03.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getGroupPriorities(input);

      expect(actual).toBe(2631);
    });
  });
});
