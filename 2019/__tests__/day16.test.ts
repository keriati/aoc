import * as fs from "fs";
import * as path from "path";
import { getSignalStart, getEmbeddedMessage } from "../day16";

describe("Advent of Code 2019", () => {
  describe("Day 16: Flawed Frequency Transmission", () => {
    it("returns the first 8 digits of the final output list example", () => {
      const actual = getSignalStart("12345678", 4);

      expect(actual).toBe("01029498");
    });

    it("returns the first 8 digits of the final output list - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day16.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getSignalStart(fileInput, 100);

      expect(actual).toBe("84970726");
    });

    it("returns 8 digit message - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day16.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getEmbeddedMessage(fileInput, 100);

      expect(actual).toBe("47664469");
    });
  });
});
