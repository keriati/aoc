import Heap from "heap-js";

const D = {
  N: 1,
  S: 2,
  E: 3,
  W: 4,
} as const;

type Direction = (typeof D)[keyof typeof D];
type Position = [number, number, Direction];
type HeatLoss = number;
type StepsInDirection = number;
type Heuristic = number;
type Step = [Heuristic, Position, HeatLoss, StepsInDirection];

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

const cacheKey = ([, [x, y, direction], hl, steps]: Step): number =>
  (y << 16) | (x << 8) | (direction << 4) | steps;

export const getLeastHeatLoss = (input: string) => {
  const map = input.split("\n").map((line) => line.split("").map(Number));
  const endX = map[0].length - 1;
  const endY = map.length - 1;

  const startX = 0;
  const startY = 0;

  const startingStepEast: Step = [0, [startX, startY, D.E], 0, 0];
  const startingStepSouth: Step = [0, [startX, startY, D.S], 0, 0];

  const queue = new Heap<Step>(([hA], [hb]) => hA - hb);
  queue.push(startingStepEast);
  queue.push(startingStepSouth);

  const visited = new Set<number>();

  while (queue.size() > 0) {
    const [, [x, y, direction], heatLoss, steps] = queue.pop();

    if (x === endX && y === endY) return heatLoss;

    const nextPositions = getNextPositions[direction](x, y)
      .filter(([, , newDirection]) =>
        steps > 2 ? newDirection !== direction : true
      )
      .filter(([x, y]) => !(x < 0 || y < 0 || y > endY || x > endX));

    for (const [nextX, nextY, nextDirection] of nextPositions) {
      let nextStep: Step = [
        heatLoss + map[nextY][nextX] + endX - nextX + endY - nextY,
        [nextX, nextY, nextDirection],
        heatLoss + map[nextY][nextX],
        nextDirection === direction ? steps + 1 : 1,
      ];

      const key = cacheKey(nextStep);
      if (!visited.has(key)) {
        visited.add(key);
        queue.push(nextStep);
      }
    }
  }

  return -1;
};

export const getLeastHeatLossUltra = (input: string) => {
  const map = input.split("\n").map((line) => line.split("").map(Number));
  const endX = map[0].length - 1;
  const endY = map.length - 1;

  const startX = 0;
  const startY = 0;

  const startingStepEast: Step = [0, [startX, startY, D.E], 0, 0];
  const startingStepSouth: Step = [0, [startX, startY, D.S], 0, 0];

  const queue = new Heap<Step>(([hA], [hB]) => hA - hB);
  queue.push(startingStepEast);
  queue.push(startingStepSouth);

  const visited = new Set<number>();

  while (queue.size() > 0) {
    const [, [x, y, direction], heatLoss, steps] = queue.pop();

    if (x === endX && y === endY) {
      if (steps < 4) continue;
      return heatLoss;
    }

    const nextPositions = getNextPositions[direction](x, y)
      .filter(([, , newDirection]) => {
        if (steps < 4) return newDirection === direction;
        if (steps > 9) return newDirection !== direction;
        return true;
      })
      .filter(([x, y]) => !(x < 0 || y < 0 || y > endY || x > endX));

    for (const [nextX, nextY, newDirection] of nextPositions) {
      let nextStep: Step = [
        heatLoss + map[nextY][nextX] + endX - nextX + endY - nextY,
        [nextX, nextY, newDirection],
        heatLoss + map[nextY][nextX],
        newDirection === direction ? steps + 1 : 1,
      ];

      const key = cacheKey(nextStep);
      if (!visited.has(key)) {
        visited.add(key);
        queue.push(nextStep);
      }
    }
  }

  return -1;
};
