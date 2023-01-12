import * as fs from "fs";
import * as path from "path";
import { getHouseCount, getHouseCountWithRobot } from "../day03";

describe("Advent of Code 2015", () => {
  describe("Day 3: Perfectly Spherical Houses in a Vacuum", () => {
    it("returns the number of houses", () => {
      const actual = getHouseCount("^>v<");

      expect(actual).toBe(4);
    });

    it("returns the number of houses - from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day03.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getHouseCount(input);

      expect(actual).toBe(2081);
    });

    it("returns the number of houses when with robot", () => {
      const actual = getHouseCountWithRobot("^>v<");

      expect(actual).toBe(3);
    });

    it("returns the number of houses when with robot 2", () => {
      const actual = getHouseCountWithRobot("^v^v^v^v^v");

      expect(actual).toBe(11);
    });

    it("returns the number of houses when with robot - from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day03.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getHouseCountWithRobot(input);

      expect(actual).toBe(2341);
    });
  });
});
