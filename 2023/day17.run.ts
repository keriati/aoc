import fs from "fs";
import path from "path";
import { getLeastHeatLoss, getLeastHeatLossUltra } from "./day17";

const fileInput = fs.readFileSync(path.resolve(__dirname, "day17.txt"), {
  encoding: "utf8",
  flag: "r",
});

console.time("part1");
getLeastHeatLoss(fileInput);
console.timeEnd("part1");

console.time("part2");
getLeastHeatLossUltra(fileInput);
console.timeEnd("part2");
