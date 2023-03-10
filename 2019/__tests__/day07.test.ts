import * as fs from "fs";
import * as path from "path";
import { getHighestSignal, getHighestSignalLoop } from "../day07";

describe("Advent of Code 2019", () => {
  describe("Day 07: Amplification Circuit", () => {
    it("returns the highest signal", () => {
      const input = `3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0`;
      const actual = getHighestSignal(input, [4, 3, 2, 1, 0]);

      expect(actual).toBe(43210);
    });

    it("returns the highest signal 2", () => {
      const input = `3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0`;
      const actual = getHighestSignal(input, [0, 1, 2, 3, 4]);

      expect(actual).toBe(54321);
    });

    it("returns the highest signal 3", () => {
      const input = `3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0`;
      const actual = getHighestSignal(input, [1, 0, 4, 3, 2]);

      expect(actual).toBe(65210);
    });

    it("returns the highest signal - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day07.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getHighestSignal(input);

      expect(actual).toBe(199988);
    });

    it("returns the highest signal when in loop", () => {
      const input = `3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5`;
      const actual = getHighestSignalLoop(input, [9, 8, 7, 6, 5]);

      expect(actual).toBe(139629729);
    });

    it("returns the highest signal when in loop 2", () => {
      const input = `3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10`;
      const actual = getHighestSignalLoop(input, [9, 7, 8, 5, 6]);

      expect(actual).toBe(18216);
    });

    it("returns the highest signal when in loop - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day07.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getHighestSignalLoop(input);

      expect(actual).toBe(17519904);
    });
  });
});
