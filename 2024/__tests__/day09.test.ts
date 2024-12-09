import * as fs from "fs";
import * as path from "path";
import { getChecksum, getCheckSumWholeFiles } from "../day09";

const input = `2333133121414131402`;

describe("Advent of Code 2024", () => {
  describe("Day 09: Disk Fragmenter", () => {
    it("returns the checksum of the filesystem", () => {
      const actual = getChecksum(input);

      expect(actual).toBe(1928);
    });

    it("returns the checksum of the filesystem - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day09.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getChecksum(fileInput);

      expect(actual).toBe(6283404590840);
    });

    it("returns the checksum of the filesystem when moving whole files", () => {
      const actual = getCheckSumWholeFiles(input);

      expect(actual).toBe(2858);
    });

    it("returns the checksum of the filesystem when moving whole files - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day09.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getCheckSumWholeFiles(fileInput);

      expect(actual).toBe(6304576012713);
    });
  });
});
