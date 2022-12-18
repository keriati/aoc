import * as fs from "fs";
import * as path from "path";
import { getSmallestDirToDelete, getTotalSize } from "../day7";

const testInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

describe("Advent of Code", () => {
  describe("Day 7", () => {
    it("returns total size of directories", () => {
      const actual = getTotalSize(testInput);

      expect(actual).toEqual(95437);
    });

    it("returns total size of directories from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day7.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getTotalSize(input);

      expect(actual).toEqual(1141028);
    });

    it("returns smallest directory size to delete", () => {
      const actual = getSmallestDirToDelete(testInput);

      expect(actual).toEqual(24933642);
    });

    it("returns smallest directory size to delete from file", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day7.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getSmallestDirToDelete(input);

      expect(actual).toEqual(8278005);
    });
  });
});
