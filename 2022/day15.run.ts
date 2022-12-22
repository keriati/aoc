import fs from "fs";
import path from "path";
import { getBeaconPosition } from "./day15";

export function main() {
  const fileInput = fs.readFileSync(path.resolve(__dirname, "day15.txt"), {
    encoding: "utf8",
    flag: "r",
  });

  const timer = Date.now();
  const result = getBeaconPosition(fileInput, [0, 4000000]);
  const took = Date.now() - timer;
  console.log(`Found result: \x1b[31m${result}\x1b[0m in ${took}ms`);
}

main();
