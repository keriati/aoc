import * as fs from "fs";
import * as path from "path";
import { getConnected, getGroups } from "../day12";

const input = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;

describe("Advent of Code 2017", () => {
  describe("Day 12: Digital Plumber", () => {
    it("returns the number of programs connected to 0 example 1", () => {
      const actual = getConnected(input);

      expect(actual).toBe(6);
    });

    it("returns the number of programs connected to 0 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day12.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getConnected(fileInput);

      expect(actual).toBe(115);
    });

    it("returns the number of groups example 1", () => {
      const actual = getGroups(input);

      expect(actual).toBe(2);
    });

    it("returns the number of groups - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day12.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getGroups(fileInput);

      expect(actual).toBe(221);
    });
  });
});
