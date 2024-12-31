import * as fs from "fs";
import * as path from "path";
import {
  explode,
  getResult,
  getResultPart2,
  Pair,
  parse,
  split,
} from "../day18";

const input = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;

describe("Advent of Code 2021", () => {
  describe("Day 18: Snailfish", () => {
    describe("explode", () => {
      it("returns the exploded number", () => {
        const inputs = [
          ["[[[[[9,8],1],2],3],4]", "[[[[0,9],2],3],4]"],
          ["[7,[6,[5,[4,[3,2]]]]]", "[7,[6,[5,[7,0]]]]"],
          ["[[6,[5,[4,[3,2]]]],1]", "[[6,[5,[7,0]]],3]"],
          [
            "[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]",
            "[[3,[2,[8,0]]],[9,[5,[7,0]]]]",
          ],
        ];

        for (const [input, expected] of inputs) {
          expect(explode(parse(JSON.parse(input)) as Pair).toString()).toBe(
            expected
          );
        }
      });
    });

    describe("split", () => {
      it("returns the split number", () => {
        const inputs = [
          [
            "[[[[0,7],4],[15,[0,13]]],[1,1]]",
            "[[[[0,7],4],[[7,8],[6,0]]],[8,1]]",
          ],
        ];
        for (const [input, expected] of inputs) {
          expect(split(parse(JSON.parse(input)) as Pair).toString()).toBe(
            expected
          );
        }
      });
    });

    describe("sum", () => {
      it("returns the sum", () => {
        const actual = getResult(
          `[1,1]
[2,2]
[3,3]
[4,4]
[5,5]
[6,6]`,
          false
        );

        expect(actual.toString()).toBe("[[[[5,0],[7,4]],[5,5]],[6,6]]");
      });

      it("returns the sum 2", () => {
        const actual = getResult(
          `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]`,
          false
        );

        expect(actual.toString()).toBe(
          "[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]"
        );
      });
    });

    it("returns the result", () => {
      const actual = getResult(input);

      expect(actual).toBe(4140);
    });

    it("returns the result - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day18.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResult(fileInput);

      expect(actual).toBe(4008);
    });

    it("returns the result part 2", () => {
      const actual =
        getResultPart2(`[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`);

      expect(actual).toBe(3993);
    });

    it("returns the result part 2 - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day18.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResultPart2(fileInput);

      expect(actual).toBe(4667);
    });
  });
});
