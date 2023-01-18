import { getResult } from "../day10";

describe("Advent of Code 2015", () => {
  describe("Day 10", () => {
    it("returns the result", () => {
      expect(getResult('1',1)).toBe('11');
      expect(getResult('1',3)).toBe('1211');
      expect(getResult('11',1)).toBe('21');
      expect(getResult('21',1)).toBe('1211');
      expect(getResult('1211',1)).toBe('111221');
      expect(getResult('111221',1)).toBe('312211');
      expect(getResult('1321131112',1)).toBe('11131221133112');
      expect(getResult('1321131112',40).length).toBe(492982);
      expect(getResult('1321131112',50).length).toBe(6989950);
    });
  });
});
