import fs from "fs";
import path from "path";
import { getStoneCount } from "./day11";
import { getLowestScore, getTileCount } from "./day16";

const fileInput = fs.readFileSync(path.resolve(__dirname, process.argv[2]), {
  encoding: "utf8",
  flag: "r",
});

const result = getLowestScore(fileInput);
console.log(result);
