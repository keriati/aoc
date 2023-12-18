import fs from "fs";
import path from "path";
import { getLavaAmount } from "./day18";
import { writeToTerminal } from "../util/utils";

export const render = (
  map: (number | string)[][],
  steps: [number, number][]
) => {
  console.clear();
  const nMap = map.map((l) => l.map((s) => (s === "." ? " " : s)));
  console.log(nMap.map((line) => line.join("")).join("\n"));
  const t = setInterval(() => {
    for (let i = 0; i < 2; i++) {
      if (steps.length < 1) {
        clearInterval(t);
        writeToTerminal(0, nMap.length + 1, "\x1b[0m");
        return;
      }
      const [x, y] = steps.shift();

      writeToTerminal(x, y, "\x1b[41m \x1b[0m");
    }
  }, 0.1);
};

const fileInput = fs.readFileSync(path.resolve(__dirname, "day18.txt"), {
  encoding: "utf8",
  flag: "r",
});

getLavaAmount(fileInput);
