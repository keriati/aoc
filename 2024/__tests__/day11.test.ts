import * as fs from "fs";
import * as path from "path";
import { getStoneCount } from "../day11";

const input = `125 17`;

describe("Advent of Code 2024", () => {
  describe("Day 11: Plutonian Pebbles", () => {
    it("returns the number of stones after 6 blinks", () => {
      const actual = getStoneCount(input, 6);

      expect(actual).toBe(22);
    });

    it("returns the number of stones after 25 blinks", () => {
      const actual = getStoneCount(input, 25);

      expect(actual).toBe(55312);
    });

    it("returns the number of stones after 25 blinks - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day11.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getStoneCount(fileInput, 25);

      expect(actual).toBe(193607);
    });

    it("returns the number of stones after 75 blinks - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day11.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getStoneCount(fileInput, 75);

      expect(actual).toBe(229557103025807);
    });
  });
});
