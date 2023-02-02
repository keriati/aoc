import * as fs from "fs";
import * as path from "path";
import { getResult, getResult2 } from "../day10";

const input = `16
10
15
5
1
11
7
19
6
12
4`;

const input2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

describe("Advent of Code 2020", () => {
  describe("Day 10: Adapter Array", () => {
    it("returns jolt1 differences multiplied by jolt3 differences", () => {
      const actual = getResult(input);

      expect(actual).toBe(35);
    });

    it("returns jolt1 differences multiplied by jolt3 differences - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day10.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual).toBe(2112);
    });

    it("returns total number of distinct ways to connect adapters", () => {
      const actual = getResult2(input);

      expect(actual).toBe(8);
    });

    it("returns total number of distinct ways to connect adapters 2", () => {
      const actual = getResult2(input2);

      expect(actual).toBe(19208);
    });

    it("returns total number of distinct ways to connect adapters - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day10.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult2(input);

      expect(actual).toBe(3022415986688);
    });
  });
});
