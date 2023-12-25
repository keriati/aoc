import fs from "fs";
import path from "path";
import { getPlotsCountBig } from "./day21";

const fileInput = fs.readFileSync(path.resolve(__dirname, "day21.txt"), {
  encoding: "utf8",
  flag: "r",
});

const actual = getPlotsCountBig(fileInput, 26501365);

console.log(actual);
