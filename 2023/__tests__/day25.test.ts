import * as fs from "fs";
import * as path from "path";
import { getComponentGroupSizes } from "../day25";

const input = `jqt: rhn xhk nvd
rsh: frs pzl lsr
xhk: hfx
cmg: qnr nvd lhk bvb
rhn: xhk bvb hfx
bvb: xhk hfx
pzl: lsr hfx nvd
qnr: nvd
ntq: jqt hfx bvb xhk
nvd: lhk
lsr: lhk
rzs: qnr cmg lsr rsh
frs: qnr lhk lsr`;

describe("Advent of Code 2023", () => {
  describe("Day 25: Snowverload", () => {
    it("returns the product of component group sizes", () => {
      const actual = getComponentGroupSizes(input);

      expect(actual).toBe(54);
    });

    it("returns the product of component group sizes - file input", () => {
      const fileInput = fs.readFileSync(
        path.resolve(__dirname, "../day25.txt"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );

      const actual = getComponentGroupSizes(fileInput);

      expect(actual).toBe(552682);
    });
  });
});
