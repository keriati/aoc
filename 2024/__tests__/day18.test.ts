import * as fs from "fs";
import * as path from "path";
import { getMinSteps, getNoExitByte } from "../day18";

const input = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;

describe("Advent of Code 2024", () => {
  describe("Day 18: RAM Run", () => {
    it("returns the minimum number of steps", () => {
      const actual = getMinSteps(input, 6, 12);

      expect(actual).toBe(22);
    });

    it("returns the minimum number of steps - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day18.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getMinSteps(fileInput, 70, 1024);

      expect(actual).toBe(316);
    });

    it("the coordinates of the first byte that will prevent the exit", () => {
      const actual = getNoExitByte(input, 6);

      expect(actual).toBe("6,1");
    });

    it("returns the coordinates of the first byte that will prevent the exit - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day18.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getNoExitByte(fileInput, 70);

      expect(actual).toBe("45,18");
    });
  });
});
