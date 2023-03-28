import * as fs from "fs";
import * as path from "path";
import { getResult, getResult2 } from "../day18";

const input = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;

describe("Advent of Code 2017", () => {
  describe("Day 18: Duet", () => {
    it("returns the value of the recovered frequency", () => {
      const actual = getResult(input);

      expect(actual).toBe(4);
    });

    it("returns the value of the recovered frequency - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day18.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput);

      expect(actual).toBe(1187);
    });

    it("returns the amount of sends from program 1 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day18.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult2(fileInput);

      expect(actual).toBe(5969);
    });
  });
});
