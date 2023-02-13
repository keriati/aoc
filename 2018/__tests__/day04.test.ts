import * as fs from "fs";
import * as path from "path";
import { getReposeResults, getReposeMinute } from "../day04";

describe("Advent of Code 2018", () => {
  describe("Day 04: Repose Record", () => {
    it("returns id of most sleeping guard times most slept minute", () => {
      const input = `[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-01 00:25] wakes up
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`;
      const actual = getReposeResults(input);

      expect(actual).toBe(240);
    });

    it("returns id of most sleeping guard times most slept minute - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day04.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getReposeResults(input);

      expect(actual).toBe(118599);
    });

    it("returns most slept minute times guard id", () => {
      const input = `[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-01 00:25] wakes up
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`;
      const actual = getReposeMinute(input);

      expect(actual).toBe(4455);
    });

    it("returns most slept minute times guard id - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day04.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getReposeMinute(input);

      expect(actual).toBe(33949);
    });
  });
});
