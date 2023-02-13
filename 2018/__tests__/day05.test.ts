import * as fs from "fs";
import * as path from "path";
import { getReactedLength, getShortestPolymerLength } from "../day05";

describe("Advent of Code 2018", () => {
  describe("Day 05: Alchemical Reduction", () => {
    it("returns the polymer after fully reacting", () => {
      const input = `dabAcCaCBAcCcaDA`;
      const actual = getReactedLength(input);

      expect(actual).toBe(10);
    });

    it("returns the polymer after fully reacting - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day05.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getReactedLength(input);

      expect(actual).toBe(11894);
    });

    it("returns the length of the shortest polymer", () => {
      const input = `dabAcCaCBAcCcaDA`;
      const actual = getShortestPolymerLength(input);

      expect(actual).toBe(4);
    });

    it("returns the length of the shortest polymer - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day05.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getShortestPolymerLength(input);

      expect(actual).toBe(5310);
    });
  });
});
