import fs from "fs";
import path from "path";
import { animateGhostSteps } from "./day08";

const fileInput = fs.readFileSync(path.resolve(__dirname, "day08.txt"), {
  encoding: "utf8",
  flag: "r",
});

const actual = animateGhostSteps(fileInput);
