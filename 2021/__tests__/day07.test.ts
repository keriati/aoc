import * as fs from "fs";
import * as path from "path";
import { getResult } from "../day07";

describe("Advent of Code 2021", () => {
  describe("Day 7: The Treachery of Whales", () => {
    it("returns the result", () => {
      const input = `16,1,2,0,4,2,7,1,2,14`;
      const actual = getResult(input);

      expect(actual).toBe(37);
    });

    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day07.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual).toBe(343468);
    });

    it("returns the result part 2", () => {
      const input = `16,1,2,0,4,2,7,1,2,14`;
      const actual = getResult(input, false);

      expect(actual).toBe(168);
    });

    it("returns the result part 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day07.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input, false);

      expect(actual).toBe(96086265);
    });
  });
});
