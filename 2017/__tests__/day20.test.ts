import * as fs from "fs";
import * as path from "path";
import { getClosestParticle, getResultPart2 } from "../day20";

const input = `p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>
p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>`;

const inputP2 = `p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>    
p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>
p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>
p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>`;

describe("Advent of Code 2017", () => {
  describe("Day 20: Particle Swarm", () => {
    it("returns the closest particle", () => {
      const actual = getClosestParticle(input);

      expect(actual).toBe(0);
    });

    it("returns the closest particle - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day20.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getClosestParticle(fileInput);

      expect(actual).toBe(457);
    });

    it("returns the particle count after collisions", () => {
      const actual = getResultPart2(inputP2);

      expect(actual).toBe(1);
    });

    it("returns the particle count after collisions - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day20.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getResultPart2(fileInput);

      expect(actual).toBe(448);
    });
  });
});
