import * as fs from "fs";
import * as path from "path";
import { getTopCrates, getTopCratesCM9001 } from "../day5";

const stackString = ["ZN", "MCD", "P"];

const commands = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

/**
 * [S]                 [T] [Q]
 * [L]             [B] [M] [P]     [T]
 * [F]     [S]     [Z] [N] [S]     [R]
 * [Z] [R] [N]     [R] [D] [F]     [V]
 * [D] [Z] [H] [J] [W] [G] [W]     [G]
 * [B] [M] [C] [F] [H] [Z] [N] [R] [L]
 * [R] [B] [L] [C] [G] [J] [L] [Z] [C]
 * [H] [T] [Z] [S] [P] [V] [G] [M] [M]
 *  1   2   3   4   5   6   7   8   9
 */
const stacksStringFile = [
  "HRBDZFLS",
  "TBMZR",
  "ZLCHNS",
  "SCFJ",
  "PGHWRZB",
  "VJZGDNMT",
  "GLNWFSPQ",
  "MZR",
  "MCLGVRT",
];

describe("Advent of Code", () => {
  describe("Day 5", () => {
    it("returns top crates when using CrateMover 9000", () => {
      const actual = getTopCrates(commands, stackString);

      expect(actual).toBe("CMZ");
    });

    it("returns top crates when using CrateMover 9000 from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day5.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getTopCrates(input, stacksStringFile);

      expect(actual).toBe("RNZLFZSJH");
    });

    it("returns top crates when using CrateMover 9001", () => {
      const actual = getTopCratesCM9001(commands, stackString);

      expect(actual).toBe("MCD");
    });

    it("returns top crates when using CrateMover 9001 from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day5.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getTopCratesCM9001(input, stacksStringFile);

      expect(actual).toBe("CNSFCGJSM");
    });
  });
});
