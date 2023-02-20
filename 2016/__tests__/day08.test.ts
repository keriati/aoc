import * as fs from "fs";
import * as path from "path";
import { getCode, getPixelCount } from "../day08";

const input = `rect 3x2
rotate column x=1 by 1
rotate row y=0 by 4
rotate column x=1 by 1`;

describe("Advent of Code 2016", () => {
  describe("Day 08: Two-Factor Authentication", () => {
    it("returns the amount of lit pixels", () => {
      const input = `rect 3x2
rotate column x=1 by 1
rotate row y=0 by 4
rotate column x=1 by 1`;

      const actual = getPixelCount(input, 7, 3);

      expect(actual).toBe(6);
    });

    it("returns the amount of lit pixels - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day08.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getPixelCount(input, 50, 6);

      expect(actual).toBe(119);
    });

    it("returns the secret code - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day08.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getCode(input, 50, 6);

      expect(actual).toBe(`
#### #### #  # ####  ### ####  ##   ##  ###   ##  
   # #    #  # #    #    #    #  # #  # #  # #  # 
  #  ###  #### ###  #    ###  #  # #    #  # #  # 
 #   #    #  # #     ##  #    #  # # ## ###  #  # 
#    #    #  # #       # #    #  # #  # #    #  # 
#### #    #  # #    ###  #     ##   ### #     ##  `);
    });
  });
});
