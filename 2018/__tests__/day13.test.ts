import * as fs from "fs";
import * as path from "path";
import { getFirstCrashPosition, getLastCartPosition } from "../day13";

describe("Advent of Code 2018", () => {
  describe("Day 13: Mine Cart Madness", () => {
    it("returns the position of the frist crash example", () => {
      const input = `/->-\\        
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/   `;

      const actual = getFirstCrashPosition(input);

      expect(actual).toEqual([7, 3]);
    });

    it("returns the position of the frist crash - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day13.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getFirstCrashPosition(fileInput);

      expect(actual).toEqual([86, 118]);
    });

    it("returns the position of the last cart example", () => {
      const input = `/>-<\\  
|   |  
| /<+-\\
| | | v
\\>+</ |
  |   ^
  \\<->/`;

      const actual = getLastCartPosition(input);

      expect(actual).toEqual([6, 4]);
    });

    it("returns the position of the last cart - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day13.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getLastCartPosition(fileInput);

      expect(actual).toEqual([2, 81]);
    });
  });
});
