import fs from "fs";
import path from "path";
import { getCheatsCount } from "./day20";

const fileInput = fs.readFileSync(path.resolve(__dirname, process.argv[2]), {
  encoding: "utf8",
  flag: "r",
});

console.time("part2");
const result = getCheatsCount(fileInput);
console.timeEnd("part2");
console.log(result);
