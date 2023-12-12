import * as fs from "fs";
import * as path from "path";
import { getArrangementSum } from "../day12";

const inputOk = `#.#.### 1,1,3
.#...#....###. 1,1,3
.#.###.#.###### 1,3,1,6
####.#...#... 4,1,1
#....######..#####. 1,6,5
.###.##....# 3,2,1`;

const input = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

describe("Advent of Code 2023", () => {
  describe("Day 12", () => {
    it("returns the sum of all arrangements", () => {
      const actual = getArrangementSum(input);

      expect(actual).toBe(21);
    });

    it("returns the sum of all arrangements - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day12.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getArrangementSum(fileInput);

      expect(actual).toBe(8419);
    });

    it("returns the sum of all arrangements unfolded", () => {
      const actual = getArrangementSum(input, 5);

      expect(actual).toBe(525152);
    });

    it("returns the sum of all arrangements unfolded - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day12.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getArrangementSum(fileInput, 5);

      expect(actual).toBe(160500973317706);
    });
  });
});
