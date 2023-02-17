import * as fs from "fs";
import * as path from "path";
import { getResult, getResult2 } from "../day07";

const input = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`;

describe("Advent of Code 2018", () => {
  describe("Day 07: The Sum of Its Parts", () => {
    it("returns the order of steps", () => {
      const actual = getResult(input);

      expect(actual).toBe("CABDFE");
    });

    it("returns the order of steps - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day07.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual).toBe("BGKDMJCNEQRSTUZWHYLPAFIVXO");
    });

    it("returns the time needed for assembly", () => {
      const actual = getResult2(input, 2, 0);

      expect(actual).toBe(15);
    });

    it("returns the time needed for assembly - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day07.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult2(input, 5, 60);

      expect(actual).toBe(941);
    });
  });
});
