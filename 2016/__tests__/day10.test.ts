import * as fs from "fs";
import * as path from "path";
import { getBotResults } from "../day10";

const input = `value 5 goes to bot 2
bot 2 gives low to bot 1 and high to bot 0
value 3 goes to bot 1
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
value 2 goes to bot 2`;

describe("Advent of Code 2016", () => {
  describe("Day 10: Balance Bots", () => {
    it("returns the bot comparing the given numbers", () => {
      const actual = getBotResults(input, 2, 5);

      expect(actual[0]).toBe("bot 2");
    });

    it("returns the bot comparing the given numbers - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day10.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getBotResults(fileInput, 61, 17);

      expect(actual[0]).toBe("bot 93");
    });

    it("returns the result of the multiplication - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day10.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getBotResults(fileInput, 61, 17);

      expect(actual[1]).toBe(47101);
    });
  });
});
