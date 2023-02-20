import * as fs from "fs";
import * as path from "path";
import { checkImage, drawImage } from "../day08";

const input = `123456789012`;

describe("Advent of Code 2019", () => {
  describe("Day 08: Space Image Format", () => {
    it("returns the image checksum", () => {
      const actual = checkImage(input, 3, 2);

      expect(actual).toBe(1);
    });

    it("returns the image checksum - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day08.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = checkImage(fileInput, 25, 6);

      expect(actual).toBe(2016);
    });

    it("returns the image - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day08.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = drawImage(fileInput, 25, 6);

      expect(actual).toBe(`
 #  # ####  ##  #### #  #
 #  #    # #  #    # #  #
 ####   #  #      #  #  #
 #  #  #   #     #   #  #
 #  # #    #  # #    #  #
 #  # ####  ##  ####  ## 
 `);
    });
  });
});
