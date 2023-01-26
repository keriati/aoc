import * as fs from "fs";
import * as path from "path";
import { getHighestSeatID, getMySeatID } from "../day05";

describe("Advent of Code 2020", () => {
  describe("Day 05 Binary Boarding", () => {
    it("returns the highest seat id", () => {
      expect(getHighestSeatID(`FBFBBFFRLR`)).toBe(357);
      expect(getHighestSeatID(`BFFFBBFRRR`)).toBe(567);
      expect(getHighestSeatID(`FFFBBBFRRR`)).toBe(119);
      expect(getHighestSeatID(`BBFFBBFRLL`)).toBe(820);
    });

    it("returns the highest seat id - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day05.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getHighestSeatID(input);

      expect(actual).toBe(892);
    });

    it("returns my seat id - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day05.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getMySeatID(input);

      expect(actual).toBe(625);
    });
  });
});
