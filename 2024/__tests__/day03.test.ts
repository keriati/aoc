import * as fs from "fs";
import * as path from "path";
import {
  getMultiplicationResult,
  getMultiplicationResultCleaned,
} from "../day03";

const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const input2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

describe("Advent of Code 2024", () => {
  describe("Day 03: Mull It Over", () => {
    it("returns the result of the multiplications", () => {
      const actual = getMultiplicationResult(input);

      expect(actual).toBe(161);
    });

    it("returns the result of the multiplications - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day03.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getMultiplicationResult(fileInput);

      expect(actual).toBe(183380722);
    });

    it("returns the result of the multiplications considering do() instructions", () => {
      const actual = getMultiplicationResultCleaned(input2);

      expect(actual).toBe(48);
    });

    it("returns the result of the multiplications considering do() instructions - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day03.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getMultiplicationResultCleaned(fileInput);

      expect(actual).toBe(82733683);
    });
  });
});
