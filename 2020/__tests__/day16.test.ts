import * as fs from "fs";
import * as path from "path";
import { getTicketScanningErrorRate, getDepartureFields } from "../day16";

const input = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;

describe("Advent of Code 2020", () => {
  describe("Day 16: Ticket Translation", () => {
    it("returns the error rate of ticket scanning", () => {
      const actual = getTicketScanningErrorRate(input);

      expect(actual).toBe(71);
    });

    it("returns the error rate of ticket scanning - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day16.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getTicketScanningErrorRate(input);

      expect(actual).toBe(19060);
    });

    it("returns product of departure fields - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day16.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getDepartureFields(input);

      expect(actual).toBe(953713095011);
    });
  });
});
