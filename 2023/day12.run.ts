import fs from "fs";
import path from "path";
import { getArrangementSum } from "./day12";

const fileInput = fs.readFileSync(path.resolve(__dirname, "day12.txt"), {
  encoding: "utf8",
  flag: "r",
});
const start = Date.now();
const actual = getArrangementSum(fileInput, 5);

console.log("Time", Date.now() - start, "ms");
