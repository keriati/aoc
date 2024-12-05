import * as fs from "fs";
import * as path from "path";
import { getCorrectUpdatesSum, getOrderedUpdatesSum } from "../day05";

const input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

describe("Advent of Code 2024", () => {
  describe("Day 05: Print Queue", () => {
    it("returns the sum of the middle page number from correctly-ordered updates", () => {
      const actual = getCorrectUpdatesSum(input);

      expect(actual).toBe(143);
    });

    it("returns the sum of the middle page number from correctly-ordered updates - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day05.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getCorrectUpdatesSum(fileInput);

      expect(actual).toBe(4637);
    });

    it("returns the sum of the middle page numbers after correctly ordering", () => {
      const actual = getOrderedUpdatesSum(input);

      expect(actual).toBe(123);
    });

    it("returns the sum of the middle page numbers after correctly ordering - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day05.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getOrderedUpdatesSum(fileInput);

      expect(actual).toBe(6370);
    });
  });
});
