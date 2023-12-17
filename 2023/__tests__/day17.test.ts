import * as fs from "fs";
import * as path from "path";
import { getLeastHeatLoss, getLeastHeatLossUltra } from "../day17";

const input = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`;

describe("Advent of Code 2023", () => {
  describe("Day 17: Clumsy Crucible", () => {
    it("returns the least heat loss possible", () => {
      const actual = getLeastHeatLoss(input);

      expect(actual).toBe(102);
    });

    it("returns the least heat loss possible - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day17.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getLeastHeatLoss(fileInput);

      expect(actual).toBe(916);
    });

    it("returns the least heat loss possible with ultra crucible", () => {
      const actual = getLeastHeatLossUltra(input);

      expect(actual).toBe(94);
    });

    it("returns the least heat loss possible with ultra crucible - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day17.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getLeastHeatLossUltra(fileInput);

      expect(actual).toBe(1067);
    });
  });
});
