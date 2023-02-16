import * as fs from "fs";
import * as path from "path";
import { getResult, getResult2 } from "../day07";

const input = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`;

describe("Advent of Code 2017", () => {
  describe("Day 07: Recursive Circus", () => {
    it("returns the bottom program", () => {
      const actual = getResult(input);

      expect(actual).toBe("tknk");
    });

    it("returns the bottom program - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day07.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual).toBe("wiapj");
    });

    it("returns the adjusted weight to balance", () => {
      const actual = getResult2(input, "tknk");

      expect(actual).toBe(60);
    });

    it("returns the adjusted weight to balance - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day07.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult2(input, "wiapj");

      expect(actual).toBe(1072);
    });
  });
});
