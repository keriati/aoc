import * as fs from "fs";
import * as path from "path";
import { getResult, getResult2 } from "../day13";

describe("Advent of Code 2020", () => {
  describe("Day 13: Shuttle Search", () => {
    it("returns the the earliest bus ID multiplied by minutes to wait", () => {
      const input = `939
7,13,x,x,59,x,31,19`;

      const actual = getResult(input);

      expect(actual).toBe(295);
    });

    it("returns the the earliest bus ID multiplied by minutes to wait - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day13.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual).toBe(4938);
    });

    it("returns the timestamp to depart", () => {
      const input = `939
7,13,x,x,59,x,31,19`;
      const actual = getResult2(input);

      expect(actual).toBe(1068781);
    });

    it("returns the timestamp to depart example 2", () => {
      const myInput = `
17,x,13,19`;

      const actual = getResult2(myInput);

      expect(actual).toBe(3417);
    });

    it("returns the timestamp to depart example 3", () => {
      const myInput = `
67,7,59,61`;

      const actual = getResult2(myInput);

      expect(actual).toBe(754018);
    });

    it("returns the timestamp to depart example 4", () => {
      const myInput = `
67,x,7,59,61`;

      const actual = getResult2(myInput);

      expect(actual).toBe(779210);
    });

    it("returns the timestamp to depart example 5", () => {
      const myInput = `
67,7,x,59,61`;

      const actual = getResult2(myInput);

      expect(actual).toBe(1261476);
    });

    it("returns the timestamp to depart example 6", () => {
      const myInput = `
1789,37,47,1889`;

      const actual = getResult2(myInput);

      expect(actual).toBe(1202161486);
    });

    it("returns the timestamp to depart - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day13.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult2(input);

      expect(actual).toBe(230903629977901);
    });
  });
});
