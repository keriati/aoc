import * as fs from "fs";
import * as path from "path";
import { getResult, getResultPart2, getResultPart2AStar } from "../day10";

const input = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;

describe("Advent of Code 2025", () => {
  describe("Day 10", () => {
    it("returns the result", () => {
      const actual = getResult(input);

      expect(actual).toBe(7);
    });

    it("returns the result - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day10.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput);

      expect(actual).toBe(550);
    });

    it("returns the result part 2", async () => {
      const actual = await getResultPart2(input);

      expect(actual).toBe(33);
    });

    it.skip("returns the result part 2 A Star", async () => {
      const actual = await getResultPart2AStar(input);

      expect(actual).toBe(33);
    });

    it(
      "returns the result part 2 - file input",
      async () => {
        const fileInput = fs.readFileSync(
          path.resolve(__dirname, "../day10.txt"),
          {
            encoding: "utf8",
            flag: "r",
          }
        );

        const actual = await getResultPart2(fileInput);

        expect(actual).toBe(20042);
      },
      60 * 1000
    );

    it.skip(
      "returns the result part 2 A Star - file input",
      () => {
        const fileInput = fs.readFileSync(
          path.resolve(__dirname, "../day10.txt"),
          {
            encoding: "utf8",
            flag: "r",
          }
        );

        const actual = getResultPart2AStar(fileInput);

        expect(actual).toBe(20042);
      },
      60 * 1000
    );
  });
});
