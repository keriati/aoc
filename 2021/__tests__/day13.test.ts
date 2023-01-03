import * as fs from "fs";
import * as path from "path";
import { getResult, getResultPart2 } from "../day13";

describe("Advent of Code 2021", () => {
  describe("Day 13: Transparent Origami", () => {
    it("returns the result", () => {
      const input = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;
      const actual = getResult(input);

      expect(actual).toBe(17);
    });

    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day13.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual).toBe(743);
    });

    it("returns the result part 2", () => {
      const input = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;
      const actual = getResultPart2(input);

      expect(actual).toBe(`
#####                                   
#   #                                   
#   #                                   
#   #                                   
#####                                   
                                        `);
    });

    it("returns the result part 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day13.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResultPart2(input);

      expect(actual).toBe(`
###   ##  ###  #     ##  #  # #  # #    
#  # #  # #  # #    #  # # #  #  # #    
#  # #    #  # #    #  # ##   #### #    
###  #    ###  #    #### # #  #  # #    
# #  #  # #    #    #  # # #  #  # #    
#  #  ##  #    #### #  # #  # #  # #### `);
    });
  });
});
