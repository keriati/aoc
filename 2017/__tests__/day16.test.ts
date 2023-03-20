import * as fs from "fs";
import * as path from "path";
import { getDanceState, getGigaDanceState } from "../day16";

describe("Advent of Code 2017", () => {
  describe("Day 16: Permutation Promenade", () => {
    it("returns the state after 1 dance example ", () => {
      const actual = getDanceState(`s1,x3/4,pe/b`, `abcde`);

      expect(actual).toBe("baedc");
    });

    it("returns the state after 1 dance - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day16.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getDanceState(fileInput, "abcdefghijklmnop");

      expect(actual).toBe("ociedpjbmfnkhlga");
    });

    it("returns the state after 1B dances - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day16.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getGigaDanceState(fileInput, "abcdefghijklmnop");

      expect(actual).toBe("gnflbkojhicpmead");
    });
  });
});
