import * as fs from "fs";
import * as path from "path";
import { getDistances } from "../day03";

describe("Advent of Code 2019", () => {
  describe("Day 03: Crossed Wires", () => {
    it("returns nearest intersection's manhattan distance", () => {
      const input = `R8,U5,L5,D3
U7,R6,D4,L4`;
      const actual = getDistances(input);

      expect(actual[0]).toBe(6);
    });

    it("returns nearest intersection's manhattan distance 2", () => {
      const input = `R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`;
      const actual = getDistances(input);

      expect(actual[0]).toBe(159);
    });

    it("returns nearest intersection's manhattan distance 3", () => {
      const input = `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`;
      const actual = getDistances(input);

      expect(actual[0]).toBe(135);
    });

    it("returns nearest intersection's manhattan distance - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day03.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getDistances(input);

      expect(actual[0]).toBe(865);
    });

    it("returns the fewest steps needed to reach an intersection", () => {
      const input = `R8,U5,L5,D3
U7,R6,D4,L4`;

      const actual = getDistances(input);

      expect(actual[1]).toBe(30);
    });

    it("returns the fewest steps needed to reach an intersection 2", () => {
      const input = `R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`;

      const actual = getDistances(input);

      expect(actual[1]).toBe(610);
    });

    it("returns the fewest steps needed to reach an intersection 3", () => {
      const input = `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`;

      const actual = getDistances(input);

      expect(actual[1]).toBe(410);
    });

    it("returns the fewest steps needed to reach an intersection - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day03.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getDistances(input);

      expect(actual[1]).toBe(35038);
    });
  });
});
