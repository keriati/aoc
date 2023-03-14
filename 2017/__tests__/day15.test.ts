import { getJudgeCount, getJudgeCount2 } from "../day15";

describe("Advent of Code 2017", () => {
  describe("Day 15: Dueling Generators", () => {
    it("returns the final count of the judge example", () => {
      const actual = getJudgeCount(65, 8921);

      expect(actual).toBe(588);
    });

    it("returns the final count of the judge", () => {
      const actual = getJudgeCount(512, 191);

      expect(actual).toBe(567);
    });

    it("returns the final count of the judge part 2 example", () => {
      const actual = getJudgeCount2(65, 8921);

      expect(actual).toBe(309);
    });

    it("returns the final count of the judge part 2", () => {
      const actual = getJudgeCount2(512, 191);

      expect(actual).toBe(323);
    });
  });
});
