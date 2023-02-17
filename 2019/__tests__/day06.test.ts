import * as fs from "fs";
import * as path from "path";
import { getAllOrbits, getShortestPathToSAN } from "../day06";

const input = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`;

const input2 = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`;

describe("Advent of Code 2019", () => {
  describe("Day 06: Universal Orbit Map", () => {
    it("returns the number of orbits", () => {
      const actual = getAllOrbits(input);

      expect(actual).toBe(42);
    });

    it("returns the number of orbits - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day06.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getAllOrbits(input);

      expect(actual).toBe(253104);
    });

    it("returns the path to SAN from YOU", () => {
      const actual = getShortestPathToSAN(input2);

      expect(actual).toBe(4);
    });

    it("returns the path to SAN from YOU - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day06.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getShortestPathToSAN(input);

      expect(actual).toBe(499);
    });
  });
});
