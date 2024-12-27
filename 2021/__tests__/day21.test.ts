import * as fs from "fs";
import * as path from "path";
import { getResult, getResultPart2 } from "../day21";

const input = `Player 1 starting position: 4
Player 2 starting position: 8`;

describe("Advent of Code 2021", () => {
  describe("Day 21: Dirac Dice", () => {
    it("returns the result", () => {
      const actual = getResult(input);

      expect(actual).toBe(739785);
    });

    it("returns the result - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day21.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput);

      expect(actual).toBe(503478);
    });

    it("returns the result part 2", () => {
      const actual = getResultPart2(input);

      expect(actual).toBe(444356092776315);
    });

    it("returns the result part 2 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day21.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResultPart2(fileInput);

      expect(actual).toBe(716241959649754);
    });
  });
});
