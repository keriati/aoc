import * as fs from "fs";
import * as path from "path";
import { getSteps, getGhostSteps } from "../day08";

const input = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const input2 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

describe("Advent of Code 2023", () => {
  describe("Day 08: Haunted Wasteland", () => {
    it("returns the number of steps required", () => {
      const actual = getSteps(input);

      expect(actual).toBe(2);
    });

    it("returns the number of steps required - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day08.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getSteps(fileInput);

      expect(actual).toBe(16697);
    });

    it("returns the number of steps required as a ghost", () => {
      const actual = getGhostSteps(input2);

      expect(actual).toBe(6);
    });

    it("returns the number of steps required as a ghost - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day08.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getGhostSteps(fileInput);

      expect(actual).toBe(10668805667831);
    });
  });
});
