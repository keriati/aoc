import { MinBucketQueue } from "bucket-priority-queue";

const D = {
  N: 1,
  E: 2,
  S: 3,
  W: 4,
} as const;

type Direction = (typeof D)[keyof typeof D];
type Position = [number, number, Direction];
type HeatLoss = number;
type StepsInDirection = number;
type Step = [...Position, HeatLoss, StepsInDirection];

const getNextPositions: Record<
  Direction,
  (x: number, y: number) => Position[]
> = {
  [D.N]: (x, y) => [
    [x, y - 1, D.N],
    [x + 1, y, D.E],
    [x - 1, y, D.W],
  ],
  [D.S]: (x, y) => [
    [x, y + 1, D.S],
    [x + 1, y, D.E],
    [x - 1, y, D.W],
  ],
  [D.E]: (x, y) => [
    [x, y + 1, D.S],
    [x, y - 1, D.N],
    [x + 1, y, D.E],
  ],
  [D.W]: (x, y) => [
    [x, y + 1, D.S],
    [x, y - 1, D.N],
    [x - 1, y, D.W],
  ],
};

const cacheKey = ([x, y, direction, , steps]: Step): number =>
  // (y << (8 + 3 + 4)) | (x << (3 + 4)) | (direction << 4) | steps; // safer, slower
  (((x + 1) * 43 + (y + 1) * 17) * 5 + direction) * 9 + steps; // speed 25ms, 45ms

const findHeatLoss = (map: number[][], minSteps: number, maxSteps: number) => {
  const endX = map[0].length - 1;
  const endY = map.length - 1;

  const startingStepEast: Step = [0, 0, D.E, 0, 0];
  const startingStepSouth: Step = [0, 0, D.S, 0, 0];

  const queue = new MinBucketQueue<Step>();
  queue.push(startingStepSouth, 0);
  queue.push(startingStepEast, 0);

  const visited = new Set<number>();
  visited.add(cacheKey(startingStepSouth));
  visited.add(cacheKey(startingStepEast));

  // const visitedTiles = new Map<number, [number, number]>();

  while (queue.size) {
    const [x, y, dir, heatLoss, steps] = queue.pop();
    // visitedTiles.set(mk2n(x, y), [x, y]);

    if (x === endX && y === endY) {
      if (steps < minSteps) continue;
      return heatLoss;
    }

    const nextPositions = getNextPositions[dir](x, y);

    for (const [nx, ny, nDir] of nextPositions) {
      if (nx < 0 || ny < 0 || nx > endX || ny > endY) continue;
      if (steps > maxSteps - 1 && dir === nDir) continue;
      if (steps < minSteps && dir !== nDir) continue;

      const next: Step = [
        nx,
        ny,
        nDir,
        heatLoss + map[ny][nx],
        nDir === dir ? steps + 1 : 1,
      ];
      const heuristic = heatLoss + map[ny][nx] + endX - nx + endY - ny;

      const key = cacheKey(next);
      if (!visited.has(key)) {
        visited.add(key);
        queue.push(next, heuristic);
      }
    }
  }

  // render(map, visitedTiles);

  return -1;
};

export const getLeastHeatLoss = (input: string) => {
  const map = input.split("\n").map((line) => line.split("").map(Number));
  return findHeatLoss(map, 1, 3);
};

export const getLeastHeatLossUltra = (input: string) => {
  const map = input.split("\n").map((line) => line.split("").map(Number));
  return findHeatLoss(map, 4, 10);
};
