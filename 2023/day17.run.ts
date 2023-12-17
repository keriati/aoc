import fs from "fs";
import path from "path";
import { getLeastHeatLoss, getLeastHeatLossUltra } from "./day17";
import { writeToTerminal } from "../util/utils";

const fileInput = fs.readFileSync(path.resolve(__dirname, "day17.txt"), {
  encoding: "utf8",
  flag: "r",
});

export const render = (
  map: (number | string)[][],
  visitedTiles: Map<number, [number, number]>
) => {
  const tiles = Array.from(visitedTiles.values());
  console.clear();
  console.log(map.map((line) => line.join("")).join("\n"));

  const t = setInterval(() => {
    if (tiles.length < 1) {
      clearInterval(t);
      return;
    }
    const [x, y] = tiles.shift();

    writeToTerminal(x, y);
  }, 1);
};

console.time("part1");
getLeastHeatLoss(fileInput);
console.timeEnd("part1");

console.time("part2");
getLeastHeatLossUltra(fileInput);
console.timeEnd("part2");
