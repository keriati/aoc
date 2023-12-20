import * as fs from "fs";
import * as path from "path";
import { findLettersAndSteps } from "../day19";

const input = `     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ 

`;

describe("Advent of Code 2017", () => {
  describe("Day 19: A Series of Tubes", () => {
    it("returns the letters seen", () => {
      const actual = findLettersAndSteps(input);

      expect(actual[0]).toBe("ABCDEF");
    });

    it("returns the letters seen - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day19.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = findLettersAndSteps(fileInput);

      expect(actual[0]).toBe("DTOUFARJQ");
    });

    it("returns steps taken", () => {
      const actual = findLettersAndSteps(input);

      expect(actual[1]).toBe(38);
    });

    it("returns steps taken - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day19.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = findLettersAndSteps(fileInput);

      expect(actual[1]).toBe(16642);
    });
  });
});
