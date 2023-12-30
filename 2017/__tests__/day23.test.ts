import * as fs from "fs";
import * as path from "path";
import { getRegisterH, getRegisterHNonDebug } from "../day23";

describe("Advent of Code 2017", () => {
  describe("Day 23: Coprocessor Conflagration", () => {
    it("return the value of register h", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day23.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getRegisterH(fileInput);

      expect(actual).toBe(5929);
    });

    it("return the value of register h when not in debug", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day23.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getRegisterHNonDebug(fileInput);

      expect(actual).toBe(907);
    });
  });
});
