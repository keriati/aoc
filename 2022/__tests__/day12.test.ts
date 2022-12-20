import * as fs from "fs";
import * as path from "path";
import { canMove, getFewestSteps } from "../day12";

const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

describe("Advent of Code", () => {
  describe("Day 12", () => {
    it("should climb", () => {
      expect(canMove("a", "b")).toBeTruthy();
      expect(canMove("b", "a")).toBeTruthy();
      expect(canMove("z", "y")).toBeTruthy();
      expect(canMove("z", "x")).toBeTruthy();
      expect(canMove("z", "a")).toBeTruthy();

      expect(canMove("a", "c")).toBeFalsy();
      expect(canMove("a", "d")).toBeFalsy();
    });

    it("returns fewest steps needed", () => {
      const actual = getFewestSteps(input);

      expect(actual).toEqual(31);
    });

    it("returns monkey business from file2", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day12.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getFewestSteps(fileInput);

      expect(actual).toEqual(120384);
    });
  });
});
