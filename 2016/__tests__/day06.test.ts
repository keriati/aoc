import * as fs from "fs";
import * as path from "path";
import { getMessageMostCommon, getMessageLeastCommon } from "../day06";

const input = `eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar`;

describe("Advent of Code 2016", () => {
  describe("Day 06: Signals and Noise", () => {
    it("returns the messages based on most common characters", () => {
      const actual = getMessageMostCommon(input);

      expect(actual).toBe("easter");
    });

    it("returns the messages based on most common characters - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day06.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getMessageMostCommon(input);

      expect(actual).toBe("gyvwpxaz");
    });

    it("returns the messages based on least common characters - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day06.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getMessageLeastCommon(input);

      expect(actual).toBe("jucfoary");
    });
  });
});
