import fs from "fs";
import path from "path";
import { getResultPart2 } from "./day06";

const fileInput = fs.readFileSync(path.resolve(__dirname, process.argv[2]), {
  encoding: "utf8",
  flag: "r",
});

const res2 = getResultPart2(fileInput);

console.log(res2);
