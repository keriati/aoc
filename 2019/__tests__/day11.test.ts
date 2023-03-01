import * as fs from "fs";
import * as path from "path";
import { getPanelsPainted, getRegID } from "../day11";

describe("Advent of Code 2019", () => {
  describe("Day 11: Space Police", () => {
    it("returns the number of painted panels - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day11.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getPanelsPainted(fileInput);

      expect(actual).toBe(2322);
    });

    it("returns the license identifier - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day11.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getRegID(fileInput);

      expect(actual).toBe(`
                                         
   ## #  #  ##  ###  ###   ##   ##  #  # 
    # #  # #  # #  # #  # #  # #  # #  # 
    # #### #  # #  # ###  #    #    #  # 
    # #  # #### ###  #  # # ## #    #  # 
 #  # #  # #  # # #  #  # #  # #  # #  # 
  ##  #  # #  # #  # ###   ###  ##   ##  
                                         `);
    });
  });
});
