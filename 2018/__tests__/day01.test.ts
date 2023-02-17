import * as fs from "fs";
import * as path from "path";
import { getFrequency, getFrequencyTwice } from "../day01";

describe("Advent of Code 2018", () => {
  describe("Day 01: Chronal Calibration", () => {
    it("returns the frequency", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day01.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getFrequency(input);

      expect(actual).toBe(599);
    });

    it("returns the frequency reached twice", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day01.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getFrequencyTwice(input);

      expect(actual).toBe(81204);
    });
  });
});
