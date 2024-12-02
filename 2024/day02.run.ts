import fs from "fs";
import path from "path";
import { getSafeReports, getSafeReportsThisIsFine } from "./day02";

const fileInput = fs.readFileSync(path.resolve(__dirname, "day02.txt"), {
  encoding: "utf8",
  flag: "r",
});

const p1 = getSafeReports(fileInput);
const p2 = getSafeReportsThisIsFine(fileInput);

console.log(p1);
console.log(p2);
