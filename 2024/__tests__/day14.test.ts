import * as fs from "fs";
import * as path from "path";
import { getSafetyFactor, getEESeconds } from "../day14";

const input = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

describe("Advent of Code 2024", () => {
  describe("Day 14: Restroom Redoubt", () => {
    it("returns the safety factor", () => {
      const actual = getSafetyFactor(input, 11, 7);

      expect(actual).toBe(12);
    });

    it("returns the safety factor - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day14.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getSafetyFactor(fileInput, 101, 103);

      expect(actual).toBe(231852216);
    });

    it("returns the fewest number of seconds that must elapse for the robots to display the Easter egg - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day14.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getEESeconds(fileInput, 101, 103);

      expect(actual).toBe(8159);
    });
  });
});
