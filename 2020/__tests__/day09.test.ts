import * as fs from "fs";
import * as path from "path";
import { findNumber, getEncryptionWeakness } from "../day09";

const input = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

describe("Advent of Code 2020", () => {
  describe("Day 9: Encoding Error", () => {
    it("returns the result", () => {
      const actual = findNumber(input, 5);

      expect(actual).toBe(127);
    });

    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day09.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = findNumber(input, 25);

      expect(actual).toBe(3199139634);
    });

    it("returns the result 2", () => {
      const actual = getEncryptionWeakness(input, 127);

      expect(actual).toBe(62);
    });

    it("returns the result 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day09.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getEncryptionWeakness(input, 3199139634);

      expect(actual).toBe(438559930);
    });
  });
});
