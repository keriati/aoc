import * as fs from "fs";
import * as path from "path";
import { getResult, getResultPart2 } from "../day$day";

const input = ``;

describe("Advent of Code $year", () => {
  describe("Day $day", () => {
    it("returns the result", () => {
      const actual = getResult(input);

      expect(actual).toBe(0);
    });

    it("returns the result - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day$day.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput);

      expect(actual).toBe(0);
    });

    it("returns the result part 2", () => {
      const actual = getResultPart2(input);

      expect(actual).toBe(0);
    });

    it("returns the result part 2 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day$day.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResultPart2(fileInput);

      expect(actual).toBe(0);
    });
  });
});
