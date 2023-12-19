import * as fs from "fs";
import * as path from "path";
import { getPartRatingSum, getRatingCombinations } from "../day19";

const input = `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`;

describe("Advent of Code 2023", () => {
  describe("Day 19: Aplenty", () => {
    it("returns the sum of part ratings", () => {
      const actual = getPartRatingSum(input);

      expect(actual).toBe(19114);
    });

    it("returns the sum of part ratings - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day19.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getPartRatingSum(fileInput);

      expect(actual).toBe(487623);
    });

    it("returns how many distinct combinations of ratings will be accepted", () => {
      const actual = getRatingCombinations(input);

      expect(actual).toBe(167_409_079_868_000);
    });

    it("returns how many distinct combinations of ratings will be accepted - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day19.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getRatingCombinations(fileInput);

      expect(actual).toBe(113550238315130);
    });
  });
});
