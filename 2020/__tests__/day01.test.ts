import * as fs from "fs";
import * as path from "path";
import { getResult, getResult2 } from "../day01";

describe("Advent of Code 2020", () => {
  describe("Day 01", () => {
    it("returns the result", () => {
      const input = `1721
979
366
299
675
1456`

      const actual = getResult(input);

      expect(actual).toBe(514579);
    });

    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day01.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual).toBe(1007331);
    });

    it("returns the result part 2", () => {
      const input = `1721
979
366
299
675
1456`

      const actual = getResult2(input);

      expect(actual).toBe(241861950);
    });

    it("returns the result part 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day01.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult2(input);

      expect(actual).toBe(48914340);
    });
  });
});
