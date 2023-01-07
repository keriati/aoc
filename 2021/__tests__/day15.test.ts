import * as fs from "fs";
import * as path from "path";
import { getResult } from "../day15";

describe("Advent of Code 2021", () => {
  describe("Day 15", () => {
    it("returns the result", () => {
      const input = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;
      const actual = getResult(input);

      expect(actual).toBe(40);
    });

    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day15.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const myDate = Date.now();
      const actual = getResult(input);
      console.log(Date.now() - myDate);
      expect(actual).toBe(656);
    });
  });
});
