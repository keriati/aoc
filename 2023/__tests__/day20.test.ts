import * as fs from "fs";
import * as path from "path";
import { getLowHighPulses, getButtonPresses } from "../day20";

const input = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`;

const input2 = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`;

describe("Advent of Code 2023", () => {
  describe("Day 20: Pulse Propagation", () => {
    it("returns the product of low and high pulses", () => {
      const actual = getLowHighPulses(input);

      expect(actual).toBe(32000000);
    });

    it("returns the product of low and high pulses - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day20.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getLowHighPulses(fileInput);

      expect(actual).toBe(839775244);
    });

    it("returns the number of button presses required - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day20.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getButtonPresses(fileInput);

      expect(actual).toBe(207787533680413);
    });
  });
});
