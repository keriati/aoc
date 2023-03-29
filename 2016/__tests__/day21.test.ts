import * as fs from "fs";
import * as path from "path";
import { Deque } from "@blakeembrey/deque";
import {
  getScrambledPassword,
  getUnscrambledPassword,
  move,
  reverse,
  rotate,
  swapLetter,
  swapPosition,
} from "../day21";

const input = `swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d`;

describe("Advent of Code 2016", () => {
  describe("Day 21: Scrambled Letters and Hash", () => {
    describe("Operations", () => {
      it("should swap positions", () => {
        const pass = "abcd";

        const actual = swapPosition(
          "swap position 1 with position 3",
          new Deque<string>(pass)
        );

        expect([...actual].join("")).toBe("adcb");
      });

      it("should swap letters", () => {
        const pass = "abcd";

        const actual = swapLetter(
          "swap letter a with letter c",
          new Deque<string>(pass)
        );

        expect([...actual].join("")).toBe("cbad");
      });

      it("should rotate", () => {
        const pass = "abcd";

        const actual = rotate("rotate right 1 steps", new Deque<string>(pass));

        expect([...actual].join("")).toBe("dabc");
      });

      it("should reverse", () => {
        const pass = "abcdefghjik";

        const actual = reverse(
          "reverse positions 3 through 6",
          new Deque<string>(pass)
        );

        expect([...actual].join("")).toBe("abcgfedhjik");
      });

      it("should move", () => {
        const pass = "abcdef";

        const actual = move(
          "move position 2 to position 4",
          new Deque<string>(pass)
        );

        expect([...actual].join("")).toBe("abdecf");
      });
    });

    it("returns the scrambled password", () => {
      const actual = getScrambledPassword(input, `abcde`);

      expect(actual).toBe("decab");
    });

    it("returns the scrambled password - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day21.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getScrambledPassword(fileInput, `abcdefgh`);

      expect(actual).toBe("dbfgaehc");
    });

    it("returns the unscrambled password", () => {
      const actual = getUnscrambledPassword(input, `decab`);

      expect(actual).toBe("abcde");
    });

    it("returns the unscrambled password - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day21.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getUnscrambledPassword(fileInput, `fbgdceah`);

      expect(actual).toBe("aghfcdeb");
    });
  });
});
