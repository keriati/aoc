import * as fs from "fs";
import * as path from "path";
import { getSignal } from "../day7";

describe("Advent of Code 2015", () => {
  describe("Day 7: Some Assembly Required", () => {
    it("returns the signal on wire a", () => {
      const input = `123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i`;

      expect(getSignal(input, "d")).toBe(72);
      expect(getSignal(input, "e")).toBe(507);
      expect(getSignal(input, "f")).toBe(492);
      expect(getSignal(input, "g")).toBe(114);
      expect(getSignal(input, "h")).toBe(65412);
      expect(getSignal(input, "i")).toBe(65079);
    });

    it("returns the signal on wire a - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day7.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getSignal(input, "a");

      expect(actual).toBe(46065);
    });

    it("returns the signal on wire a when overriding wire b - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day7.txt"), {
        encoding: "utf8",
        flag: "r",
      });
      const bOverride = input.replaceAll("1674", "46065");

      const actual = getSignal(bOverride, "a");

      expect(actual).toBe(14134);
    });
  });
});
