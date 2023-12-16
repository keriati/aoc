import * as fs from "fs";
import * as path from "path";
import {
  getNumberOfPositionsVisited,
  getNumberOfPositionsVisitedLong,
  Knot,
} from "../day09";

const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const testInputLong = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

describe("Advent of Code", () => {
  describe("Day 9: Rope Bridge", () => {
    it("returns number of visited positions", () => {
      const actual = getNumberOfPositionsVisited(testInput);

      expect(actual).toEqual(13);
    });

    it("returns number of visited positions from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day09.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getNumberOfPositionsVisited(input);

      expect(actual).toEqual(5902);
    });

    it("returns number of visited positions when long", () => {
      const actual = getNumberOfPositionsVisitedLong(testInput);

      expect(actual).toEqual(1);
    });

    it("returns number of visited positions when long 2", () => {
      const actual = getNumberOfPositionsVisitedLong(testInputLong);

      expect(actual).toEqual(36);
    });

    it("returns number of visited positions when long from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day09.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getNumberOfPositionsVisitedLong(input);

      expect(actual).toEqual(2445);
    });
  });
});
