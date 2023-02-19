import * as fs from "fs";
import * as path from "path";
import { getResult } from "../day05";

describe("Advent of Code 2019", () => {
  describe("Day 05: Sunny with a Chance of Asteroids", () => {
    it("runs the program", () => {
      expect(getResult(`3,0,4,0,99`, [1])).toEqual([1]);
      expect(getResult(`1102,2,3,0,4,0,99`, [1])).toEqual([6]);
      expect(getResult(`1101,2,3,0,4,0,99`, [1])).toEqual([5]);
      expect(getResult(`1,7,8,0,4,0,99,2,3`, [1])).toEqual([5]);
      expect(getResult(`2,7,8,0,4,0,99,2,3`, [1])).toEqual([6]);
    });

    it("runs the program - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day05.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input, [1]);

      expect(actual).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 5346030]);
    });

    it("runs the program for part 2", () => {
      expect(getResult(`3,9,8,9,10,9,4,9,99,-1,8`, [8])).toEqual([1]);
      expect(getResult(`3,9,8,9,10,9,4,9,99,-1,8`, [7])).toEqual([0]);

      expect(getResult(`3,9,7,9,10,9,4,9,99,-1,8`, [7])).toEqual([1]);
      expect(getResult(`3,9,7,9,10,9,4,9,99,-1,8`, [8])).toEqual([0]);

      expect(getResult(`3,3,1108,-1,8,3,4,3,99`, [8])).toEqual([1]);
      expect(getResult(`3,3,1108,-1,8,3,4,3,99`, [7])).toEqual([0]);

      expect(getResult(`3,3,1107,-1,8,3,4,3,99`, [7])).toEqual([1]);
      expect(getResult(`3,3,1107,-1,8,3,4,3,99`, [8])).toEqual([0]);

      expect(
        getResult(`3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9`, [0])
      ).toEqual([0]);
      expect(
        getResult(`3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9`, [1])
      ).toEqual([1]);
    });

    it("runs the program for part 2 big example", () => {
      const input = `3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99`;
      expect(getResult(input, [7])).toEqual([999]);
      expect(getResult(input, [8])).toEqual([1000]);
      expect(getResult(input, [9])).toEqual([1001]);
    });

    it("runs the program for part 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day05.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input, [5]);

      expect(actual).toEqual([513116]);
    });
  });
});
