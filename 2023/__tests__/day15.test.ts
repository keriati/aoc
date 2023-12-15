import * as fs from "fs";
import * as path from "path";
import { getHashSum, getFocusPower } from "../day15";

const input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

describe("Advent of Code 2023", () => {
  describe("Day 15", () => {
    it("returns the sum of hashes", () => {
      const actual = getHashSum(input);

      expect(actual).toBe(1320);
    });

    it("returns the sum of hashes - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day15.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getHashSum(fileInput);

      expect(actual).toBe(517315);
    });

    it("returns the focus power of the resulting lens configuration", () => {
      const actual = getFocusPower(input);

      expect(actual).toBe(145);
    });

    it("returns the focus power of the resulting lens configuration - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day15.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getFocusPower(fileInput);

      expect(actual).toBe(247763);
    });
  });
});
