import * as fs from "fs";
import * as path from "path";
import { getSafeTiles } from "../day18";

describe("Advent of Code 2016", () => {
  describe("Day 18: Like a Rogue", () => {
    it("returns the number of safe tiles example", () => {
      const input = `.^^.^.^^^^`;

      const actual = getSafeTiles(input, 10);

      expect(actual).toBe(38);
    });

    it("returns the number of safe tiles part 1 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day18.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getSafeTiles(fileInput, 40);

      expect(actual).toBe(2013);
    });

    it("returns the number of safe tiles part 2 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day18.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getSafeTiles(fileInput, 400000);

      expect(actual).toBe(20006289);
    });
  });
});
