import fs from "fs";
import path from "path";
import { getEnclosedTileCount } from "./day10";

const fileInput = fs.readFileSync(path.resolve(__dirname, "day10.txt"), {
  encoding: "utf8",
  flag: "r",
});

getEnclosedTileCount(fileInput);
