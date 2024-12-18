import { mk2n } from "../util/utils";

type Position = [number, number];

const getMinStepsFromBytePositions = (
  mapSize: number,
  bytePositionsFull: number[],
  bytes: number
) => {
  const bytePositions = new Set(bytePositionsFull.slice(0, bytes));

  const start: Position = [0, 0];
  const end: Position = [mapSize, mapSize];

  const queue: [Position, number][] = [[start, 0]];
  const visited = new Set<number>();
  visited.add(mk2n(start[0], start[1]));

  while (queue.length > 0) {
    const [[x, y], steps] = queue.shift();

    if (x === end[0] && y === end[1]) {
      return steps;
    }

    const nextSteps = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];

    for (const [nx, ny] of nextSteps) {
      const key = mk2n(nx, ny);
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx <= mapSize &&
        ny <= mapSize &&
        !visited.has(key) &&
        !bytePositions.has(key)
      ) {
        visited.add(key);
        queue.push([[nx, ny], steps + 1]);
      }
    }
  }

  return -1;
};

export const getMinSteps = (input: string, mapSize: number, bytes: number) => {
  const bytePositions = input
    .split("\n")
    .map((l) => l.split(",").map(Number))
    .map(([x, y]) => mk2n(x, y));

  return getMinStepsFromBytePositions(mapSize, bytePositions, bytes);
};

export const getNoExitByte = (input: string, mapSize: number): string => {
  const byteLines = input.split("\n");

  const bytePositionsFull = input
    .split("\n")
    .map((l) => l.split(",").map(Number))
    .map(([x, y]) => mk2n(x, y));

  let left = 0;
  let right = byteLines.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const hasPath = getMinStepsFromBytePositions(
      mapSize,
      bytePositionsFull,
      mid
    );

    if (hasPath === -1) {
      if (
        mid === 0 ||
        getMinStepsFromBytePositions(mapSize, bytePositionsFull, mid - 1) !== -1
      ) {
        return byteLines[mid - 1];
      }
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return "-1,-1";
};
