import * as fs from "fs";
import * as path from "path";
import { getOccupiedSeats, getOccupiedSeatsImproved } from "../day11";

const input = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

describe("Advent of Code 2020", () => {
  describe("Day 11: Seating System", () => {
    it("returns the number of occupied seats", () => {
      const actual = getOccupiedSeats(input);

      expect(actual).toBe(37);
    });

    it("returns the number of occupied seats - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day11.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getOccupiedSeats(input);

      expect(actual).toBe(2178);
    });

    it("returns the number of occupied seats improved", () => {
      const actual = getOccupiedSeatsImproved(input);

      expect(actual).toBe(26);
    });

    it("returns the number of occupied seats improved - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day11.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getOccupiedSeatsImproved(input);

      expect(actual).toBe(1978);
    });
  });
});
