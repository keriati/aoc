import fs from "fs";
import path from "path";
import { getResultPart2AStar } from "./day10";

const fileInput = fs.readFileSync(path.resolve(__dirname, "day10.txt"), {
  encoding: "utf8",
  flag: "r",
});

const p1 = getResultPart2AStar(fileInput);

console.log({ result: p1 });
