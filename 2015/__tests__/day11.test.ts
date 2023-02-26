import { getResult, isValidPassword } from "../day11";

describe("Advent of Code 2015", () => {
  describe("Day 11: Corporate Policy", () => {
    it("returns the next valid password - examples", () => {
      expect(getResult(`abcdefgh`)).toBe(`abcdffaa`);
      expect(getResult(`ghijklmn`)).toBe(`ghjaabcc`);
    });

    it("returns the next valid password", () => {
      const actual = getResult(`vzbxkghb`);

      expect(actual).toBe("vzbxxyzz");
    });
    it("returns the next valid password again", () => {
      const actual = getResult(`vzbxxyzz`);

      expect(actual).toBe("vzcaabcc");
    });
  });
});
