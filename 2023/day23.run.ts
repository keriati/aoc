import fs from "fs";
import path from "path";
import { getLongestHike } from "./day23";

const fileInput = fs.readFileSync(path.resolve(__dirname, "day23.txt"), {
  encoding: "utf8",
  flag: "r",
});

console.time("getLongestHike");
const actual = getLongestHike(fileInput);
console.timeEnd("getLongestHike");
console.log(actual);
