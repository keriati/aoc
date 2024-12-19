import fs from "fs";
import path from "path";
import { getPatterns } from "./day19";

const fileInput = fs.readFileSync(path.resolve(__dirname, process.argv[2]), {
  encoding: "utf8",
  flag: "r",
});

const result = getPatterns(fileInput);
console.log(result);
