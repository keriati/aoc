import * as fs from "fs";
import * as path from "path";
import { getLowestIP, getIPCount } from "../day20";

const input = `5-8
0-2
4-7`;

describe("Advent of Code 2016", () => {
  describe("Day 20: Firewall Rules", () => {
    it("returns the number of the lowest non blocked ip", () => {
      const actual = getLowestIP(input);

      expect(actual).toBe(3);
    });

    it("returns the number of the lowest non blocked ip - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day20.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getLowestIP(fileInput);

      expect(actual).toBe(23_923_783);
    });

    it("returns the number of non blocked IPs - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day20.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getIPCount(fileInput, 4_294_967_295);

      expect(actual).toBe(125);
    });
  });
});
