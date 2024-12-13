import * as fs from "fs";
import * as path from "path";
import { getFewestTokens } from "../day13";

const input = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;

describe("Advent of Code 2024", () => {
  describe("Day 13: Claw Contraption", () => {
    it("returns the fewest tokens", async () => {
      const actual = await getFewestTokens(input);

      expect(actual).toBe(480);
    });

    it("returns the fewest tokens - file input", async () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day13.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = await getFewestTokens(fileInput);

      expect(actual).toBe(33921);
    });

    it("returns the fewest tokens with high positions", async () => {
      const actual = await getFewestTokens(input, 10000000000000);

      expect(actual).toBe(875318608908);
    });

    it("returns the fewest tokens with high positions - file input", async () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day13.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = await getFewestTokens(fileInput, 10000000000000);

      expect(actual).toBe(82261957837868);
    });
  });
});
