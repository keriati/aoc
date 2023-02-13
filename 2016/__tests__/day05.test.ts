import { getPassword, getPasswordBetter } from "../day05";

describe("Advent of Code 2016", () => {
  describe("Day 05: How About a Nice Game of Chess?", () => {
    it("returns the password", () => {
      const input = `ffykfhsq`;
      const actual = getPassword(input);

      expect(actual).toBe("c6697b55");
    });

    it("returns the password from better solution", () => {
      const input = `ffykfhsq`;
      const actual = getPasswordBetter(input);

      expect(actual).toBe("8c35d1ab");
    });
  });
});
