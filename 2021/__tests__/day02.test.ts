import * as fs from "fs";
import * as path from "path";
import { getPosition, getPositionAlt } from "../day02";

describe("Advent of Code 2021", () => {
  describe("Day 2: Dive!", () => {
    it("returns final position", () => {
      const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;
      const actual = getPosition(input);

      expect(actual).toBe(150);
    });

    it("returns final position - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day02.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getPosition(input);

      expect(actual).toBe(1383564);
    });

    it("returns final position part 2", () => {
      const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;
      const actual = getPositionAlt(input);

      expect(actual).toBe(900);
    });

    it("returns final position part 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day02.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getPositionAlt(input);

      expect(actual).toBe(1488311643);
    });
  });
});
