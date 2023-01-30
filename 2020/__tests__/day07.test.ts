import * as fs from "fs";
import * as path from "path";
import { getParents } from "../day07";

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
  describe("Day 07", () => {
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
  });
});
