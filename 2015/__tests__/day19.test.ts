import * as fs from "fs";
import * as path from "path";
import { getMoleculesCreated, getFewestStepsForMolecule } from "../day19";

const input = `H => HO
H => OH
O => HH

HOH`;

describe("Advent of Code 2015", () => {
  describe("Day 19: Medicine for Rudolph", () => {
    it("returns how many distinct molecules can be created", () => {
      const actual = getMoleculesCreated(input);

      expect(actual).toBe(4);
    });

    it("returns how many distinct molecules can be created - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day19.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getMoleculesCreated(fileInput);

      expect(actual).toBe(576);
    });

    it("returns the fewest steps to get the molecule - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day19.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getFewestStepsForMolecule(fileInput);

      expect(actual).toBe(207);
    });
  });
});
