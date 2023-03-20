import { getDragonChecksum } from "../day16";

describe("Advent of Code 2016", () => {
  describe("Day 16: Dragon Checksum", () => {
    it("returns the Dragon Checksum example", () => {
      const actual = getDragonChecksum(`10000`, 20);

      expect(actual).toBe("01100");
    });

    it("returns the Dragon Checksum part 1", () => {
      const actual = getDragonChecksum(`01111001100111011`, 272);

      expect(actual).toBe(`11111000111110000`);
    });

    it("returns the Dragon Checksum part 2", () => {
      const actual = getDragonChecksum(`01111001100111011`, 35_651_584);

      expect(actual).toBe(`10111100110110100`);
    });
  });
});
