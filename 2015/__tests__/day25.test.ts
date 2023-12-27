import { getCodeForMachine } from "../day25";

describe("Advent of Code 2015", () => {
  describe("Day 25: Let It Snow", () => {
    it("returns the code for the machine example", () => {
      const actual = getCodeForMachine(4, 3);

      expect(actual).toBe(21345942);
    });

    it("returns the code for the machine", () => {
      const actual = getCodeForMachine(2978, 3083);

      expect(actual).toBe(2650453);
    });
  });
});
