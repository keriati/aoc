import { getShortestPath, getLongestPathLength } from "../day17";

describe("Advent of Code 2016", () => {
  describe("Day 17: Two Steps Forward", () => {
    it("returns the shortest path to the vault example 1", () => {
      const actual = getShortestPath(`ihgpwlah`);

      expect(actual).toBe("DDRRRD");
    });

    it("returns the shortest path to the vault example 2", () => {
      const actual = getShortestPath(`kglvqrro`);

      expect(actual).toBe("DDUDRLRRUDRD");
    });

    it("returns the shortest path to the vault example 3", () => {
      const actual = getShortestPath(`ulqzkmiv`);

      expect(actual).toBe("DRURDRUDDLLDLUURRDULRLDUUDDDRR");
    });

    it("returns the shortest path to the vault", () => {
      const actual = getShortestPath(`qtetzkpl`);

      expect(actual).toBe("RRRLDRDUDD");
    });

    it("returns the length of the longest path to the vault example 1", () => {
      const actual = getLongestPathLength(`ihgpwlah`);

      expect(actual).toBe(370);
    });

    it("returns the length of the longest path to the vault", () => {
      const actual = getLongestPathLength(`qtetzkpl`);

      expect(actual).toBe(706);
    });
  });
});
