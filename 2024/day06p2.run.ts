import fs from "fs";
import path from "path";
import { getObstructionCount } from "./day06";

const fileInput = fs.readFileSync(path.resolve(__dirname, process.argv[2]), {
  encoding: "utf8",
  flag: "r",
});

const res2 = getObstructionCount(fileInput);

console.log(res2);
