import * as fs from "fs";
import * as path from "path";
import { getDecompressedLength, getDecompressedLengthV2 } from "../day09";

describe("Advent of Code 2016", () => {
  describe("Day 09: Explosives in Cyberspace", () => {
    it("returns the decompressed length", () => {
      expect(getDecompressedLength(`ADVENT`)).toBe("ADVENT".length);
      expect(getDecompressedLength(`A(1x5)BC`)).toBe("ABBBBBC".length);
      expect(getDecompressedLength(`(3x3)XYZ`)).toBe("XYZXYZXYZ".length);
      expect(getDecompressedLength(`A(2x2)BCD(2x2)EFG`)).toBe(
        "ABCBCDEFEFG".length
      );
      expect(getDecompressedLength(`(6x1)(1x3)A`)).toBe("(1x3)A".length);
      expect(getDecompressedLength(`X(8x2)(3x3)ABCY`)).toBe(
        "X(3x3)ABC(3x3)ABCY".length
      );
    });

    it("returns the decompressed length - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day09.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getDecompressedLength(fileInput);

      expect(actual).toBe(107035);
    });

    it("returns the decompressed length version 2", () => {
      expect(getDecompressedLengthV2(`(3x3)XYZ`)).toBe("XYZXYZXYZ".length);
      expect(getDecompressedLengthV2(`X(8x2)(3x3)ABCY`)).toBe(
        "XABCABCABCABCABCABCY".length
      );
      expect(
        getDecompressedLengthV2(`(27x12)(20x12)(13x14)(7x10)(1x12)A`)
      ).toBe(241920);
      expect(
        getDecompressedLengthV2(
          `(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN`
        )
      ).toBe(445);
    });

    it("returns the decompressed length version 2 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day09.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getDecompressedLengthV2(fileInput);

      expect(actual).toBe(11451628995);
    });
  });
});
