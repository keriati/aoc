import * as fs from "fs";
import * as path from "path";
import { getRegisterMax } from "../day08";

const input = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`;

describe("Advent of Code 2017", () => {
  describe("Day 08: I Heard You Like Registers", () => {
    it("returns the max values from the registers", () => {
      const actual = getRegisterMax(input);

      expect(actual).toEqual([1, 10]);
    });

    it("returns the max values from the registers - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day08.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getRegisterMax(fileInput);

      expect(actual).toEqual([5966, 6347]);
    });
  });
});
