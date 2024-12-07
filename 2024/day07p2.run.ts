import fs from "fs";
import path from "path";
import { getValidEquationsWithConcat } from "./day07";

const fileInput = fs.readFileSync(path.resolve(__dirname, process.argv[2]), {
  encoding: "utf8",
  flag: "r",
});

const res2 = getValidEquationsWithConcat(fileInput);

console.log(res2);
