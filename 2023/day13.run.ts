import fs from "fs";
import path from "path";
import { getPatternNotesSum } from "./day13";

const input = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

const fileInput = fs.readFileSync(path.resolve(__dirname, "day13.txt"), {
  encoding: "utf8",
  flag: "r",
});

const actual = getPatternNotesSum(fileInput, 0);
