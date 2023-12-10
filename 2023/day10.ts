import { Deque } from "@blakeembrey/deque";
import { mk2n } from "../util/utils";

const prettyMap = {
  "|": "║",
  "-": "═",
  L: "╚",
  J: "╝",
  "7": "╗",
  F: "╔",
  " ": " ",
  "~": "~",
};

const prettyPrint = (map: string[][]) => {
  const pretty = map.map((line) => line.map((c) => prettyMap[c]));
  return pretty.map((line) => line.join("")).join("\n");
};

const getStartingPosition = (lines: string[][]): [number, number] => {
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === "S") {
        return [x, y];
      }
    }
  }
  throw new Error('Could not find "S"');
};

const getStartingPipe = (map: string[][], x: number, y: number): string => {
  let north = false;
  let east = false;
  let south = false;
  let west = false;

  if (["|", "F", "7"].includes(map[y - 1][x])) north = true;
  if (["-", "J", "7"].includes(map[y][x + 1])) east = true;
  if (["|", "J", "L"].includes(map[y + 1][x])) south = true;
  if (["-", "F", "L"].includes(map[y][x - 1])) west = true;

  if (north && south) return "|";
  if (east && west) return "-";
  if (north && west) return "J";
  if (north && east) return "L";
  if (south && west) return "7";
  if (south && east) return "F";

  throw new Error("Could not find starting pipe");
};

const getNeighbors = (
  pipe: string,
  x: number,
  y: number
): [number, number, number, number] => {
  if (pipe === "|") return [x, y - 1, x, y + 1];
  if (pipe === "-") return [x + 1, y, x - 1, y];
  if (pipe === "L") return [x + 1, y, x, y - 1];
  if (pipe === "J") return [x - 1, y, x, y - 1];
  if (pipe === "7") return [x - 1, y, x, y + 1];
  if (pipe === "F") return [x + 1, y, x, y + 1];
  throw new Error("Unknown pipe");
};

export const getMostSteps = (input: string) => {
  const map = input.split("\n").map((line) => line.split(""));

  const [startX, startY] = getStartingPosition(map);
  map[startY][startX] = getStartingPipe(map, startX, startY);

  const visited = new Set();
  const queue = [[startX, startY]];

  while (queue.length > 0) {
    const [x, y] = queue.pop();
    visited.add(mk2n(x, y));

    const pipe = map[y][x];

    const [n1x, n1y, n2x, n2y] = getNeighbors(pipe, x, y);

    if (!visited.has(mk2n(n1x, n1y))) queue.push([n1x, n1y]);
    if (!visited.has(mk2n(n2x, n2y))) queue.push([n2x, n2y]);
  }

  return visited.size / 2;
};

const getExpandedMap = (
  map: string[][],
  startX: number,
  startY: number
): string[][] => {
  const expandedMap = [];

  for (let y = 0; y < map.length * 3; y++) {
    expandedMap[y] = [];
    for (let x = 0; x < map[0].length * 3; x++) {
      expandedMap[y][x] = " ";
    }
  }

  const visited = new Set();
  const queue = [[startX, startY]];

  while (queue.length > 0) {
    const [x, y] = queue.shift();
    visited.add(mk2n(x, y));

    const pipe = map[y][x];

    let expandedX = x * 3 + 1;
    let expandedY = y * 3 + 1;

    expandedMap[expandedY][expandedX] = pipe;

    switch (pipe) {
      case "|":
        expandedMap[expandedY + 1][expandedX] = "|";
        expandedMap[expandedY - 1][expandedX] = "|";
        break;

      case "-":
        expandedMap[expandedY][expandedX + 1] = "-";
        expandedMap[expandedY][expandedX - 1] = "-";
        break;

      case "L":
        expandedMap[expandedY][expandedX + 1] = "-";
        expandedMap[expandedY - 1][expandedX] = "|";
        break;

      case "J":
        expandedMap[expandedY][expandedX - 1] = "-";
        expandedMap[expandedY - 1][expandedX] = "|";
        break;

      case "7":
        expandedMap[expandedY][expandedX - 1] = "-";
        expandedMap[expandedY + 1][expandedX] = "|";
        break;

      case "F":
        expandedMap[expandedY][expandedX + 1] = "-";
        expandedMap[expandedY + 1][expandedX] = "|";
        break;

      default:
        break;
    }

    const [n1x, n1y, n2x, n2y] = getNeighbors(pipe, x, y);

    if (!visited.has(mk2n(n1x, n1y))) queue.push([n1x, n1y]);
    if (!visited.has(mk2n(n2x, n2y))) queue.push([n2x, n2y]);
  }

  return expandedMap;
};

const getContractedMap = (map: string[][], expandedMap: string[][]) => {
  const newMap = [];

  for (let y = 0; y < map.length; y++) {
    newMap[y] = [];
    for (let x = 0; x < map[y].length; x++) {
      newMap[y][x] = expandedMap[y * 3 + 1][x * 3 + 1];
    }
  }

  return newMap;
};

const frames = [];
let p2map;
const makeFrame = (map: string[][]) => {
  frames.push(prettyPrint(getContractedMap(p2map, map)));
};

const floodMap = (map: string[][]) => {
  const visited = new Set<number>();
  visited.add(mk2n(0, 0));

  const queue = new Deque<[number, number]>([[0, 0]]);

  // let counter = 0;
  while (queue.size > 0) {
    let [x, y] = queue.popLeft();
    map[y][x] = "~";

    const neighbors = [
      [x - 1, y],
      [x + 1, y],
      [x, y + 1],
      [x, y - 1],
    ];

    for (const [nx, ny] of neighbors) {
      if (map?.[ny]?.[nx] === " " && !visited.has(mk2n(nx, ny))) {
        visited.add(mk2n(nx, ny));
        queue.push([nx, ny]);
      }
    }
    // if (counter % 1000 === 0) {
    //   console.log("frame", counter);
    //   makeFrame(map);
    // }
    // counter++;
  }
};

export const getEnclosedTileCount = (input: string) => {
  const map = input.split("\n").map((line) => line.split(""));
  // p2map = map;
  const [startX, startY] = getStartingPosition(map);

  map[startY][startX] = getStartingPipe(map, startX, startY);

  const expandedMap = getExpandedMap(map, startX, startY);

  floodMap(expandedMap);

  const newMap = getContractedMap(map, expandedMap);

  // console.log(prettyPrint(newMap));

  // const int = setInterval(() => {
  //   if (frames.length === 0) {
  //     clearInterval(int);
  //     return;
  //   }
  //   console.clear();
  //   console.log(frames.shift());
  // }, 84);

  return newMap.flat().reduce((sum, c) => (c === " " ? sum + 1 : sum), 0);
};
