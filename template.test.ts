import * as fs from "fs";
import * as path from "path";
import { getResult } from "../day$day";

describe("Advent of Code $year", () => {
  describe("Day $day", () => {
    it("returns the result", () => {
      const input = ``;
      const actual = getResult(input);

      expect(actual).toBe(0);
    });

    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day$day.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual).toBe(0);
    });
  });
});
