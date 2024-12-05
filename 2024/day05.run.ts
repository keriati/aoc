import fs from "fs";
import path from "path";
import { getOrderedUpdatesSum } from "./day05";

const fileInput = fs.readFileSync(path.resolve(__dirname, process.argv[2]), {
  encoding: "utf8",
  flag: "r",
});

const res2 = getOrderedUpdatesSum(fileInput);

console.log(res2);
