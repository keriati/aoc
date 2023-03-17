import fs from "fs";
import path from "path";
import { getResultAnim } from "./day15";

const fileInput = fs.readFileSync(path.resolve(__dirname, "day15.txt"), {
  encoding: "utf8",
  flag: "r",
});

getResultAnim(fileInput);
