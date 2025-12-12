import * as fs from "fs";
import * as path from "path";
import { getResult, getResultPart2 } from "../day11";

const input = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`;

const input2 = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`;

describe("Advent of Code 2025", () => {
  describe("Day 11", () => {
    it("returns the result", () => {
      const actual = getResult(input);

      expect(actual).toBe(5);
    });

    it("returns the result - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day11.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput);

      expect(actual).toBe(0);
    });

    it("returns the result part 2", () => {
      const actual = getResultPart2(input2);

      expect(actual).toBe(2);
    });

    it("returns the result part 2 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day11.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResultPart2(fileInput);

      expect(actual).toBe(557332758684000);
    });
  });
});
