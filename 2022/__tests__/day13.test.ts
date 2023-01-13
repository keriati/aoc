import * as fs from "fs";
import * as path from "path";
import { getDecoderKey, getSumOfIndices } from "../day13";

const input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

describe("Advent of Code", () => {
  describe("Day 13", () => {
    it("returns the sum of indices of pairs in the right order", () => {
      const actual = getSumOfIndices(input);

      expect(actual).toEqual(13);
    });

    it("returns the sum of indices of pairs in the right order from file", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day13.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getSumOfIndices(fileInput);

      expect(actual).toEqual(5013);
    });

    it("returns the decoder key", () => {
      const actual = getDecoderKey(input);

      expect(actual).toEqual(140);
    });

    it("returns the decoder key from file", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day13.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getDecoderKey(fileInput);

      expect(actual).toEqual(25038);
    });
  });
});
