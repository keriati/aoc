import * as fs from "fs";
import * as path from "path";
import { getSeverity, getDelayToPass } from "../day13";

const input = `0: 3
1: 2
4: 4
6: 4`;

describe("Advent of Code 2017", () => {
  describe("Day 13: Packet Scanners", () => {
    it("returns the severity - example", () => {
      const actual = getSeverity(input);

      expect(actual).toBe(24);
    });

    it("returns the severity - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day13.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getSeverity(fileInput);

      expect(actual).toBe(1624);
    });

    it("returns the delay needed to pass the firewall - example", () => {
      const actual = getDelayToPass(input);

      expect(actual).toBe(10);
    });

    it("returns the delay needed to pass the firewall - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day13.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getDelayToPass(fileInput);

      expect(actual).toBe(3923436);
    });
  });
});
