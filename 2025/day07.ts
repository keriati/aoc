import { mk2n } from "../util/utils";

export const getResult = (input: string) => {
  const map = input.split("\n").map((line) => line.split(""));

  let start = [0, 0];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "S") start = [x, y];
    }
  }

  const q = [start];
  const visitedSplitters = new Set<number>();

  while (q.length > 0) {
    const [x, y] = q.shift()!;

    const ny = y + 1;

    if (map[ny]?.[x] === ".") {
      q.push([x, ny]);
      continue;
    }

    if (map[ny]?.[x] === "^") {
      const key = mk2n(x, ny);
      if (!visitedSplitters.has(key)) {
        visitedSplitters.add(key);
        q.push([x - 1, ny]);
        q.push([x + 1, ny]);
      }
    }
  }

  return visitedSplitters.size;
};

const getTL = (map: string[][], [x, y]: number[], cache = {}) => {
  const cacheKey = mk2n(x, y);

  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  if (y === map.length - 1) {
    return 1;
  }

  const ny = y + 1;
  const step = map[ny][x];

  if (step === ".") {
    return getTL(map, [x, ny], cache);
  }

  if (step === "^") {
    const result =
      getTL(map, [x - 1, ny], cache) + getTL(map, [x + 1, ny], cache);

    cache[cacheKey] = result;

    return result;
  }

  throw new Error(`Unexpected step: ${step}`);
};

export const getResultPart2 = (input: string) => {
  const map = input.split("\n").map((line) => line.split(""));

  let start = [0, 0];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "S") start = [x, y];
    }
  }

  return getTL(map, start);
};
