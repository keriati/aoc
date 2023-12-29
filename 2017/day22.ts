import { pairSInt, uPairSInt } from "../util/utils";

const print = (map: Set<number>) => {
  let xMin = Number.MAX_SAFE_INTEGER;
  let xMax = Number.MIN_SAFE_INTEGER;
  let yMin = Number.MAX_SAFE_INTEGER;
  let yMax = Number.MIN_SAFE_INTEGER;

  map.forEach((v, k) => {
    const [x, y] = uPairSInt(k);
    if (x < xMin) xMin = x;
    if (x > xMax) xMax = x;
    if (y < yMin) yMin = y;
    if (y > yMax) yMax = y;
  });

  const buff = [];

  for (let ny = yMin - 2; ny <= yMax + 2; ny++) {
    const line = [];
    for (let nx = xMin - 2; nx < xMax + 2; nx++) {
      const pos = pairSInt(nx, ny);

      if (map.has(pos)) {
        line.push("#");
      } else {
        line.push(".");
      }
    }
    buff.push(line.join(""));
  }

  console.log(buff.join("\n"));
};

export const getInfections = (input: string, bursts: number) => {
  const mapMatrix = input.split("\n").map((l) => l.split(""));
  const map = new Set<number>();

  for (let y = 0; y < mapMatrix.length; y++) {
    for (let x = 0; x < mapMatrix[y].length; x++) {
      if (mapMatrix[y][x] === "#") {
        map.add(pairSInt(x, y));
      }
    }
  }

  let x = Math.floor(mapMatrix[0].length / 2);
  let y = Math.floor(mapMatrix.length / 2);
  let direction = [0, -1];

  let infections = 0;
  for (let i = 0; i < bursts; i++) {
    const pos = pairSInt(x, y);

    if (map.has(pos)) {
      direction = [direction[1] * -1, direction[0]];
      map.delete(pos);
    } else {
      direction = [direction[1], direction[0] * -1];
      map.add(pos);
      infections++;
    }
    x += direction[0];
    y += direction[1];
  }

  print(map);
  return infections;
};

const WEAKENED = 1;
const INFECTED = 2;
const FLAGGED = 3;

export const getInfectionsEvolved = (input: string, bursts: number) => {
  const mapMatrix = input.split("\n").map((l) => l.split(""));
  const map = new Map<number, number>();

  for (let y = 0; y < mapMatrix.length; y++) {
    for (let x = 0; x < mapMatrix[y].length; x++) {
      if (mapMatrix[y][x] === "#") {
        map.set(pairSInt(x, y), INFECTED);
      }
    }
  }

  let x = Math.floor(mapMatrix[0].length / 2);
  let y = Math.floor(mapMatrix.length / 2);
  let direction = [0, -1];

  let infections = 0;
  for (let i = 0; i < bursts; i++) {
    const pos = pairSInt(x, y);

    if (!map.has(pos)) {
      // clean left
      direction = [direction[1], direction[0] * -1];
      map.set(pos, WEAKENED);
    } else {
      switch (map.get(pos)) {
        case WEAKENED: // weakened straight
          map.set(pos, INFECTED);
          infections++;
          break;
        case INFECTED: // infected right
          direction = [direction[1] * -1, direction[0]];
          map.set(pos, FLAGGED);
          break;
        case FLAGGED: // flagged reverse
          direction = [direction[0] * -1, direction[1] * -1];
          map.delete(pos);
          break;
        default:
          throw new Error("Unknown status");
      }
    }
    x += direction[0];
    y += direction[1];
  }

  return infections;
};
