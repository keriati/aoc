import fs from "fs";
import path from "path";
import { getSimilarityScore } from "./day01";

const fileInput = fs.readFileSync(path.resolve(__dirname, "day01.txt"), {
  encoding: "utf8",
  flag: "r",
});

const res2 = getSimilarityScore(fileInput);

console.log(res2);
