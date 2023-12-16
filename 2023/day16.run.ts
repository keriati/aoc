import fs from "fs";
import path from "path";
import { getEnergizedTiles } from "./day16";

const input = `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`;

const fileInput = fs.readFileSync(path.resolve(__dirname, "day16.txt"), {
  encoding: "utf8",
  flag: "r",
});

const actual = getEnergizedTiles(fileInput);
