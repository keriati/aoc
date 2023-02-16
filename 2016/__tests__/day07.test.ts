import * as fs from "fs";
import * as path from "path";
import { getTLSCount, getSSLCount } from "../day07";

describe("Advent of Code 2016", () => {
  describe("Day 07: Internet Protocol Version 7", () => {
    it("returns number of IPs supporting TLS - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day07.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getTLSCount(input);

      expect(actual).toBe(118);
    });

    it("returns the number of IPs supporting SSL - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day07.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getSSLCount(input);

      expect(actual).toBe(260);
    });
  });
});
