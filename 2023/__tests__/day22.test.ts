import * as fs from "fs";
import * as path from "path";
import { getDisintegrating, getFallingBricks } from "../day22";

const input = `1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`;

describe("Advent of Code 2023", () => {
  describe("Day 22: Sand Slabs", () => {
    it("returns the amount of bricks to be safely disintegrated", () => {
      const actual = getDisintegrating(input);

      expect(actual).toBe(5);
    });

    it("returns the amount of bricks to be safely disintegrated - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day22.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getDisintegrating(fileInput);

      expect(actual).toBe(401);
    });

    it("returns the number of falling bricks", () => {
      const actual = getFallingBricks(input);

      expect(actual).toBe(7);
    });

    it("returns the number of falling bricks - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day22.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getFallingBricks(fileInput);

      expect(actual).toBe(63491);
    });
  });
});
