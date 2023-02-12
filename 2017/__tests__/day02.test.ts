import * as fs from "fs";
import * as path from "path";
import { getChecksum, getRowSun } from "../day02";

describe("Advent of Code 2017", () => {
  describe("Day 02: Corruption Checksum", () => {
    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day02.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getChecksum(input);

      expect(actual).toBe(44670);
    });

    it("returns the result 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day02.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getRowSun(input);

      expect(actual).toBe(285);
    });
  });
});
