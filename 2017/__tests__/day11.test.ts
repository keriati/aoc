import * as fs from "fs";
import * as path from "path";
import { getHexDistance } from "../day11";

describe("Advent of Code 2017", () => {
  describe("Day 11: Hex Ed", () => {
    it("returns the distance", () => {
      const actual = getHexDistance(`ne,ne,ne`);

      expect(actual[0]).toBe(3);
    });
    it("returns the distance 2", () => {
      const actual = getHexDistance(`ne,ne,sw,sw`);

      expect(actual[0]).toBe(0); //
    });
    it("returns the distance 3", () => {
      const actual = getHexDistance(`ne,ne,s,s`);

      expect(actual[0]).toBe(2);
    });
    it("returns the distance 4", () => {
      const actual = getHexDistance(`se,sw,se,sw,sw`);

      expect(actual[0]).toBe(3);
    });

    it("returns the distance and max distance - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day11.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getHexDistance(fileInput);

      expect(actual[0]).toBe(834);
      expect(actual[1]).toBe(1569);
    });
  });
});
