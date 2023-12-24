import * as fs from "fs";
import * as path from "path";
import { getIntersections, getStartingCoordinates } from "../day24";

const input = `19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`;

describe("Advent of Code 2023", () => {
  describe("Day 24: Never Tell Me The Odds", () => {
    it("returns the number of intersections in test area", () => {
      const actual = getIntersections(input, 7, 27);

      expect(actual).toBe(2);
    });

    it("returns the number of intersections in test area - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day24.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getIntersections(
        fileInput,
        200000000000000,
        400000000000000
      );

      expect(actual).toBe(14672);
    });

    it("returns the sum of the starting coordinates", async () => {
      const actual = await getStartingCoordinates(input);

      expect(actual).toBe(47);
    });

    it("returns the sum of the starting coordinates - file input", async () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day24.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = await getStartingCoordinates(fileInput);

      expect(actual).toBe(646810057104753);
    });
  });
});
