import * as fs from "fs";
import * as path from "path";
import { getChildren, getParents } from "../day07";

const input = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

describe("Advent of Code 2020", () => {
  describe("Day 07: Handy Haversacks", () => {
    it("returns the result", () => {
      const actual = getParents(input);

      expect(actual).toBe(4);
    });

    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day07.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getParents(input);

      expect(actual).toBe(177);
    });

    it("returns the result 2", () => {
      const actual = getChildren(input);

      expect(actual).toBe(32);
    });

    it("returns the result 2", () => {
      const input2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;
      const actual = getChildren(input2);

      expect(actual).toBe(126);
    });

    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day07.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getChildren(input);

      expect(actual).toBe(34988);
    });
  });
});
