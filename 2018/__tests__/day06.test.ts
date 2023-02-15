import * as fs from "fs";
import * as path from "path";
import { getResult, getResult2 } from "../day06";

describe("Advent of Code 2018", () => {
  describe("Day 06: Chronal Coordinates", () => {
    it("returns the largest area size", () => {
      const input = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`;
      const actual = getResult(input);

      expect(actual).toBe(17);
    });

    it("returns the largest area size - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day06.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual).toBe(5941);
    });

    it("returns the safe area size", () => {
      const input = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`;
      const actual = getResult2(input, 32);

      expect(actual).toBe(16);
    });

    it("returns the safe area size - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day06.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult2(input, 10000);

      expect(actual).toBe(40244);
    });
  });
});
