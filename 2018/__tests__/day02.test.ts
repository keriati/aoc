import * as fs from "fs";
import * as path from "path";
import { getChecksum, getCommonLetters } from "../day02";

describe("Advent of Code 2018", () => {
  describe("Day 02: Inventory Management System", () => {
    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day02.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getChecksum(input);

      expect(actual).toBe(5000);
    });

    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day02.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getCommonLetters(input);

      expect(actual).toBe("ymdrchgpvwfloluktajxijsqb");
    });
  });
});
