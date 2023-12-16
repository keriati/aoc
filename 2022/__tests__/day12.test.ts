import * as fs from "fs";
import * as path from "path";
import { canMove, getFewestSteps, getFewestStepsOfAll } from "../day12";

const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

describe("Advent of Code", () => {
  describe("Day 12: Hill Climbing Algorithm", () => {
    it("should decide if we can move", () => {
      expect(canMove("a", "b")).toBeTruthy();
      expect(canMove("b", "a")).toBeTruthy();
      expect(canMove("z", "y")).toBeTruthy();
      expect(canMove("z", "x")).toBeTruthy();
      expect(canMove("z", "a")).toBeTruthy();

      expect(canMove("a", "c")).toBeFalsy();
      expect(canMove("g", "x")).toBeFalsy();
    });

    it("returns fewest steps needed to get from S to E", () => {
      const actual = getFewestSteps(input);

      expect(actual).toEqual(31);
    });

    it("returns fewest steps needed to get from S to E - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day12.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getFewestSteps(fileInput);

      expect(actual).toEqual(383);
    });

    it("returns fewest steps needed to get from every a to E", () => {
      const actual = getFewestStepsOfAll(input);

      expect(actual).toEqual(29);
    });

    it("returns fewest steps needed to get from every a to E - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day12.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getFewestStepsOfAll(fileInput);

      expect(actual).toEqual(377);
    });
  });
});
