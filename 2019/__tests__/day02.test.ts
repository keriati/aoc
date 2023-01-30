import * as fs from "fs";
import * as path from "path";
import { getProgramValue, findParams } from "../day02";

describe("Advent of Code 2019", () => {
  describe("Day 02: 1202 Program Alarm", () => {
    it("returns program result", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day02.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getProgramValue(input);

      expect(actual).toBe(3166704);
    });

    it("returns 100 * noun + verb when program result is 19690720", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day02.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = findParams(input);

      expect(actual).toBe(8018);
    });
  });
});
