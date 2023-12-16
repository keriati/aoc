import * as fs from "fs";
import * as path from "path";
import { getBeaconPosition, getCoveredPositionsAtLine } from "../day15";

const input = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

describe("Advent of Code", () => {
  describe("Day 15: Beacon Exclusion Zone", () => {
    it("returns number of positions where a beacon cannot be present single", () => {
      const actual = getCoveredPositionsAtLine(
        "Sensor at x=8, y=7: closest beacon is at x=2, y=10",
        10
      );

      expect(actual).toEqual(12);
    });
    it("returns number of positions where a beacon cannot be present", () => {
      const actual = getCoveredPositionsAtLine(input, 10);

      expect(actual).toEqual(26);
    });

    it("returns number of positions where a beacon cannot be present - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day15.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getCoveredPositionsAtLine(fileInput, 2000000);

      expect(actual).toEqual(5073496);
    });

    it("returns position of the beacon", () => {
      const actual = getBeaconPosition(input, [0, 20]);

      expect(actual).toEqual(56000011);
    });

    it("returns position of the beacon - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day15.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getBeaconPosition(fileInput, [0, 4000000]);

      expect(actual).toEqual(13081194638237);
    });
  });
});
