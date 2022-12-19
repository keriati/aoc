import * as fs from "fs";
import * as path from "path";
import { getMonkeyBusiness } from "../day11";

describe("Advent of Code", () => {
  describe("Day 10", () => {
    it("returns monkey business from file1", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day11_1.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getMonkeyBusiness(input);

      expect(actual).toEqual(10605);
    });

    it("returns monkey business from file2", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day11_2.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getMonkeyBusiness(input);

      expect(actual).toEqual(120384);
    });
  });
});
