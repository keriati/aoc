import * as fs from "fs";
import * as path from "path";
import { getOreNeeded, getFuelFromOre } from "../day14";

describe("Advent of Code 2019", () => {
  describe("Day 14: Space Stoichiometry", () => {
    it("returns the amount of ORE needed for 1 FUEL example 1", () => {
      const input = `10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL`;

      const actual = getOreNeeded(input);

      expect(actual).toBe(31);
    });

    it("returns the amount of ORE needed for 1 FUEL example 2", () => {
      const input = `9 ORE => 2 A
8 ORE => 3 B
7 ORE => 5 C
3 A, 4 B => 1 AB
5 B, 7 C => 1 BC
4 C, 1 A => 1 CA
2 AB, 3 BC, 4 CA => 1 FUEL`;

      const actual = getOreNeeded(input);

      expect(actual).toBe(165);
    });

    it("returns the amount of ORE needed for 1 FUEL example 3", () => {
      const input = `157 ORE => 5 NZVS
165 ORE => 6 DCFZ
44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
179 ORE => 7 PSHF
177 ORE => 5 HKGWZ
7 DCFZ, 7 PSHF => 2 XJWVT
165 ORE => 2 GPVTF
3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`;

      const actual = getOreNeeded(input);

      expect(actual).toBe(13312);
    });

    it("returns the amount of ORE needed for 1 FUEL - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day14.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getOreNeeded(fileInput);

      expect(actual).toBe(741927);
    });

    it("returns the amount of ORE needed for 1 FUEL example 3 - part2", () => {
      const input = `157 ORE => 5 NZVS
165 ORE => 6 DCFZ
44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
179 ORE => 7 PSHF
177 ORE => 5 HKGWZ
7 DCFZ, 7 PSHF => 2 XJWVT
165 ORE => 2 GPVTF
3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`;

      const actual = getFuelFromOre(input);

      expect(actual).toBe(82892753);
    });

    it("returns the amount of FUEL produced by 1Trillion ORE - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day14.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getFuelFromOre(fileInput);

      expect(actual).toBe(2371699);
    });
  });
});
