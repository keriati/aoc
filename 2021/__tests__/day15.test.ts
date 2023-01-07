import * as fs from "fs";
import * as path from "path";
import { CaveMap, getResult, getResultPart2 } from "../day15";

describe("Advent of Code 2021", () => {
  describe("Day 15: Chiton", () => {
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

    it("returns risk at pos 1", () => {
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

      const caveMap = new CaveMap(input);

      caveMap.increase(5);

      expect(caveMap.getRisk([6, 8])).toBe(8);
      expect(caveMap.getRisk([6, 18])).toBe(9);
      expect(caveMap.getRisk([16, 18])).toBe(1);
      expect(caveMap.getRisk([26, 28])).toBe(3);
      expect(caveMap.getRisk([36, 38])).toBe(5);
      expect(caveMap.getRisk([46, 48])).toBe(7);
    });

    it("returns the result part 2", () => {
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
      const actual = getResultPart2(input);

      expect(actual).toBe(315);
    });

    it("returns the result part 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day15.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const myDate = Date.now();
      const actual = getResultPart2(input);
      console.log(Date.now() - myDate);

      expect(actual).toBe(2979);
    });
  });
});
