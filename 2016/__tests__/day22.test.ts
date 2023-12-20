import * as fs from "fs";
import * as path from "path";
import { getFewestStepsForData, getViablePairs } from "../day22";

const input = `/dev/grid/node-x0-y0   10T    8T     2T   80%
/dev/grid/node-x0-y1   11T    6T     5T   54%
/dev/grid/node-x0-y2   32T   28T     4T   87%
/dev/grid/node-x1-y0    9T    7T     2T   77%
/dev/grid/node-x1-y1    8T    0T     8T    0%
/dev/grid/node-x1-y2   11T    7T     4T   63%
/dev/grid/node-x2-y0   10T    6T     4T   60%
/dev/grid/node-x2-y1    9T    8T     1T   88%
/dev/grid/node-x2-y2    9T    6T     3T   66%`;

describe("Advent of Code 2016", () => {
  describe("Day 22: Grid Computing", () => {
    it("returns the amount of viable pairs of nodes - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day22.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getViablePairs(fileInput);

      expect(actual).toBe(1043);
    });

    it("returns the fewest number of steps required to move your goal data", () => {
      const actual = getFewestStepsForData(input);

      expect(actual).toBe(7);
    });

    it("returns the the fewest number of steps required to move your goal data - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day22.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getFewestStepsForData(fileInput);

      expect(actual).toBe(185);
    });
  });
});
