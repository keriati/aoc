import { getResult } from "../day14";

describe("Advent of Code 2016", () => {
  describe("Day 14: One-Time Pad ", () => {
    it("returns the key index", () => {
      const actual = getResult(`abc`);

      expect(actual).toBe("22728");
    });

    it("returns the key index - file input", () => {
      const actual = getResult(`yjdafjpo`);

      expect(actual).toBe("25427");
    });

    it("returns the key index after 2016 rounds", () => {
      const actual = getResult(`abc`, 2016);

      expect(actual).toBe("22551");
    });

    it("returns the key index after 2016 rounds - file input", () => {
      const actual = getResult(`yjdafjpo`, 2016);

      expect(actual).toBe("22045");
    });
  });
});
