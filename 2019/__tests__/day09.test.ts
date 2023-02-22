import * as fs from "fs";
import * as path from "path";
import { runIntCode } from "../day09";

describe("Advent of Code 2019", () => {
  describe("Day 09: Sensor Boost", () => {
    it("returns own source code", () => {
      const input = `109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99`;

      const actual = runIntCode(input);

      const expected = [
        109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0,
        99,
      ];
      expect(actual).toEqual(expected);
    });

    it("returns a 16 digit long number", () => {
      const input = `1102,34915192,34915192,7,4,7,99,0`;

      const actual = runIntCode(input);

      expect(actual[0].toString()).toHaveLength(16);
    });

    it("returns number in the middle", () => {
      const input = `104,1125899906842624,99`;

      const actual = runIntCode(input);

      expect(actual[0]).toBe(1125899906842624);
    });

    it("returns the BOOST keycode - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day09.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = runIntCode(fileInput, 1);

      expect(actual[0]).toBe(2671328082);
    });

    it("returns the coordinates of the distress signal - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day09.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = runIntCode(fileInput, 2);

      expect(actual[0]).toBe(59095);
    });
  });
});
