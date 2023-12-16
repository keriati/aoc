import * as fs from "fs";
import * as path from "path";
import { getMessageStart, getSignalStart } from "../day06";

const testInput = `mjqjpqmgbljsphdztnvjfqwrcgsmlb
bvwbjplbgvbhsrlpgdmjqwftvncz
nppdvjthqldpwncqszvftbrmjlhg
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`;

describe("Advent of Code", () => {
  describe("Day 6: Tuning Trouble", () => {
    it("returns number of character from signal start", () => {
      const actual = getSignalStart(testInput);

      expect(actual).toEqual([7, 5, 6, 10, 11]);
    });

    it("returns number of character from signal start from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day06.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getSignalStart(input);

      expect(actual).toEqual([1287]);
    });

    it("returns number of character from message start", () => {
      const actual = getMessageStart(testInput);

      expect(actual).toEqual([19, 23, 23, 29, 26]);
    });

    it("returns number of character from message start from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day06.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getMessageStart(input);

      expect(actual).toEqual([3716]);
    });
  });
});
