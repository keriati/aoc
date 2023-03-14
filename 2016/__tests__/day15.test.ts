import * as fs from "fs";
import * as path from "path";
import { getButtonTime, getButtonTime2 } from "../day15";

const input = `Disc #1 has 5 positions; at time=0, it is at position 4.
Disc #2 has 2 positions; at time=0, it is at position 1.`;

describe("Advent of Code 2016", () => {
  describe("Day 15: Timing is Everything", () => {
    it("returns the time when the button can be pressed", () => {
      const actual = getButtonTime(input);

      expect(actual).toBe(5);
    });

    it("returns the time when the button can be pressed - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day15.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getButtonTime(fileInput);

      expect(actual).toBe(376777);
    });

    it("returns the time when the button can be pressed part 2 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day15.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getButtonTime2(fileInput);

      expect(actual).toBe(3903937);
    });
  });
});
