import * as fs from "fs";
import * as path from "path";
import { getResult, getResult2 } from "../day05";

describe("Advent of Code 2017", () => {
  describe("Day 05: A Maze of Twisty Trampolines, All Alike", () => {
    it("returns the number of steps needed to reach the exit", () => {
      const input = `0
3
0
1
-3`;
      const actual = getResult(input);

      expect(actual).toBe(5);
    });

    it("returns the number of steps needed to reach the exit - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day05.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual).toBe(374269);
    });

    it("returns the number of steps needed to reach the exit 2", () => {
      const input = `0
3
0
1
-3`;
      const actual = getResult2(input);

      expect(actual).toBe(10);
    });

    it("returns the number of steps needed to reach the exit 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day05.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult2(input);

      expect(actual).toBe(27720699);
    });
  });
});
