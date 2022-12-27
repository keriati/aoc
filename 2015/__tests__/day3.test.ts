import * as fs from "fs";
import * as path from "path";
import { getHouseCount, getHouseCountWithRobot } from "../day3";

describe("Advent of Code 2015", () => {
  describe("Day 3", () => {
    it("returns the number of houses", () => {
      const topCalories = getHouseCount("^>v<");

      expect(topCalories).toBe(4);
    });

    it("returns the number of houses - from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day3.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const topCalories = getHouseCount(input);

      expect(topCalories).toBe(2081);
    });

    it("returns the number of houses when with robot", () => {
      const topCalories = getHouseCountWithRobot("^>v<");

      expect(topCalories).toBe(3);
    });

    it("returns the number of houses when with robot 2", () => {
      const topCalories = getHouseCountWithRobot("^v^v^v^v^v");

      expect(topCalories).toBe(11);
    });

    it("returns the number of houses when with robot - from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day3.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const topCalories = getHouseCountWithRobot(input);

      expect(topCalories).toBe(2341);
    });
  });
});
