import fs from "fs";
import path from "path";
import { getStoneCount } from "./day11";
import { getTileCount } from "./day16";
import { getNoExitByte } from "./day18";

const fileInput = fs.readFileSync(path.resolve(__dirname, process.argv[2]), {
  encoding: "utf8",
  flag: "r",
});

const result = getNoExitByte(fileInput, 70);
console.log(result);
