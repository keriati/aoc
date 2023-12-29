import * as fs from "fs";
import * as path from "path";
import {
  getEnhancedImage,
  split,
  getVariations,
  merge,
  IMAGE_START,
  rotate,
} from "../day21";

const input = `../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`;

describe("Advent of Code 2017", () => {
  describe("Rotate", () => {
    it("returns the image rotated 90 degrees clockwise", () => {
      const actual = rotate(`.#.\n..#\n###`);

      expect(actual).toBe(`#..\n#.#\n##.`);
    });
  });

  describe("Split", () => {
    it("returns the image parts", () => {
      const actual = split(IMAGE_START);

      expect(actual).toEqual([".#.\n..#\n###"]);
    });

    it("returns the image parts", () => {
      const testPattern = `#..#
....
....
#..#`;
      const actual = split(testPattern);

      expect(actual).toEqual(["#.\n..", ".#\n..", "..\n#.", "..\n.#"]);
    });
  });

  describe("getVariations", () => {
    it("returns all flips and rotations I can think of", () => {
      const actual = getVariations(IMAGE_START);

      expect(actual).toEqual([
        ".#.\n..#\n###",
        ".#.\n#..\n###",
        "###\n..#\n.#.",
        "###\n#..\n.#.",
        "#..\n#.#\n##.",
        "..#\n#.#\n.##",
        "##.\n#.#\n#..",
        ".##\n#.#\n..#",
      ]);
    });
  });

  describe("merge", () => {
    it("returns the image from image parts", () => {
      const actual = merge(["#..#\n....\n....\n#..#"]);

      expect(actual).toBe("#..#\n....\n....\n#..#");
    });

    it("merge2", () => {
      const actual = merge([
        "##.\n#..\n...",
        "##.\n#..\n...",
        "##.\n#..\n...",
        "##.\n#..\n...",
      ]);

      expect(actual).toBe("##.##.\n#..#..\n......\n##.##.\n#..#..\n......");
    });
  });

  describe("Day 21: Fractal Art", () => {
    it("returns the number of pixels turned on after 2 iterations", () => {
      const actual = getEnhancedImage(input, 2);

      expect(actual).toBe(12);
    });

    it("returns the number of pixels turned on after 5 iterations - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day21.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getEnhancedImage(fileInput, 5);

      expect(actual).toBe(144);
    });

    it("returns the number of pixels turned on after 18 iterations - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day21.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getEnhancedImage(fileInput, 18);

      expect(actual).toBe(2169301);
    });
  });
});
