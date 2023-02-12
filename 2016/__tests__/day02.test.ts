import * as fs from "fs";
import * as path from "path";
import { getBathroomCode, getBathroomCode2 } from "../day02";

describe("Advent of Code 2016", () => {
  describe("Day 02: Bathroom Security", () => {
    it("returns bathroom code", () => {
      const input = `ULL
RRDDD
LURDL
UUUUD`;
      const actual = getBathroomCode(input);

      expect(actual).toBe("1985");
    });

    it("returns the bathroom code - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day02.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getBathroomCode(input);

      expect(actual).toBe("24862");
    });

    it("returns bathroom code v2", () => {
      const input = `ULL
RRDDD
LURDL
UUUUD`;
      const actual = getBathroomCode2(input);

      expect(actual).toBe("5DB3");
    });

    it("returns bathroom code v2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day02.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getBathroomCode2(input);

      expect(actual).toBe("46C91");
    });
  });
});
