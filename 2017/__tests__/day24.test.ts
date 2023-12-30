import * as fs from "fs";
import * as path from "path";
import { getBridgeStrength } from "../day24";

const input = `0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`;

describe("Advent of Code 2017", () => {
  describe("Day 24: Electromagnetic Moat", () => {
    it("returns the strength of the strongest bridge", () => {
      const actual = getBridgeStrength(input);

      expect(actual).toBe(31);
    });

    it("returns the strength of the strongest bridge - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day24.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getBridgeStrength(fileInput);

      expect(actual).toBe(1656);
    });

    it("returns the strength of the longest and strongest bridge", () => {
      const actual = getBridgeStrength(input, true);

      expect(actual).toBe(19);
    });

    it("returns the strength of the longest and strongest bridge - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day24.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getBridgeStrength(fileInput, true);

      expect(actual).toBe(1642);
    });
  });
});
