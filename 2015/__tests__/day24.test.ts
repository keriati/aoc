import * as fs from "fs";
import * as path from "path";
import { getBestQuantumEntanglement } from "../day24";

const input = `1
2
3
4
5
7
8
9
10
11`;

describe("Advent of Code 2015", () => {
  describe("Day 24: It Hangs in the Balance", () => {
    it("returns the quantum entanglement of the first group of packages", () => {
      const actual = getBestQuantumEntanglement(input);

      expect(actual).toBe(99);
    });

    it("returns the quantum entanglement of the first group of packages - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day24.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getBestQuantumEntanglement(fileInput);

      expect(actual).toBe(11266889531);
    });

    it("returns the quantum entanglement of the first group of packages with 4 groups", () => {
      const actual = getBestQuantumEntanglement(input, 4);

      expect(actual).toBe(44);
    });

    it("returns the quantum entanglement of the first group of packages with 4 groups - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day24.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getBestQuantumEntanglement(fileInput, 4);

      expect(actual).toBe(77387711);
    });
  });
});
