import * as fs from "fs";
import * as path from "path";
import { getDiagnosticChecksum } from "../day25";

const input = `Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.`;

describe("Advent of Code 2017", () => {
  describe("Day 25: The Halting Problem", () => {
    it("returns the diagnostic checksum", () => {
      const actual = getDiagnosticChecksum(input);

      expect(actual).toBe(3);
    });

    it("returns the result - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day25.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getDiagnosticChecksum(fileInput);

      expect(actual).toBe(4385);
    });
  });
});
