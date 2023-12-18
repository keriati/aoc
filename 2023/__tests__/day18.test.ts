import * as fs from "fs";
import * as path from "path";
import { getLavaAmount, getLavaAmountLarge } from "../day18";

const input = `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`;

describe("Advent of Code 2023", () => {
  describe("Day 18: Lavaduct Lagoon", () => {
    it("returns the amount of lava", () => {
      const actual = getLavaAmount(input);

      expect(actual).toBe(62);
    });

    it("returns the amount of lava - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day18.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getLavaAmount(fileInput);

      expect(actual).toBe(106459);
    });

    it("returns the amount of lava part 2", () => {
      const actual = getLavaAmountLarge(input);

      expect(actual).toBe(952408144115);
    });

    it("returns the amount of lava part 2 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day18.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getLavaAmountLarge(fileInput);

      expect(actual).toBe(63806916814808);
    });
  });
});
