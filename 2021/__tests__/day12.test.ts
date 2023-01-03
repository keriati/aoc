import * as fs from "fs";
import * as path from "path";
import { getResult } from "../day12";

describe("Advent of Code 2021", () => {
  describe("Day 12: Passage Pathing", () => {
    it("returns the result", () => {
      const input = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;
      const actual = getResult(input);

      expect(actual).toBe(10);
    });

    it("returns the result 2", () => {
      const input = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;
      const actual = getResult(input);

      expect(actual).toBe(19);
    });

    it("returns the result 3", () => {
      const input = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;
      const actual = getResult(input);

      expect(actual).toBe(226);
    });

    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day12.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual).toBe(5212);
    });
  });
});
