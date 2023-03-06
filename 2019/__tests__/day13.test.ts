import * as fs from "fs";
import * as path from "path";
import { getBlocks, getFinalScore } from "../day13";

describe("Advent of Code 2019", () => {
  describe("Day 13: Care Package", () => {
    it("returns the number of blocks - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day13.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getBlocks(fileInput);

      expect(actual).toBe(273);
    });

    it("returns the final score - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day13.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getFinalScore(fileInput);

      expect(actual).toBe(13140);
    });
  });
});
