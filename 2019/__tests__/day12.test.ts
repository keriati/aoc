import { getTotalEnergy, getCycleSteps } from "../day12";

describe("Advent of Code 2019", () => {
  describe("Day 12: The N-Body Problem", () => {
    it("returns the total energy in the system example 1", () => {
      const input = `<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`;

      const actual = getTotalEnergy(input, 10);

      expect(actual).toBe(179);
    });

    it("returns the total energy in the system example 2", () => {
      const input = `<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>`;

      const actual = getTotalEnergy(input, 100);

      expect(actual).toBe(1940);
    });

    it("returns the total energy in the system", () => {
      const input = `<x=3, y=-6, z=6>
<x=10, y=7, z=-9>
<x=-3, y=-7, z=9>
<x=-8, y=0, z=4>`;

      const actual = getTotalEnergy(input, 1000);

      expect(actual).toBe(6849);
    });

    it("returns the number of steps for a cycle in state example 1", () => {
      const input = `<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`;

      const actual = getCycleSteps(input);

      expect(actual).toBe(2772);
    });

    it("returns the number of steps for a cycle in state example 2", () => {
      const input = `<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>`;

      const actual = getCycleSteps(input);

      expect(actual).toBe(4686774924);
    });

    it("returns the number of steps for a cycle in state", () => {
      const input = `<x=3, y=-6, z=6>
<x=10, y=7, z=-9>
<x=-3, y=-7, z=9>
<x=-8, y=0, z=4>`;

      const actual = getCycleSteps(input);

      expect(actual).toBe(356658899375688);
    });
  });
});
