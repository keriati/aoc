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
type Step = [Position, HeatLoss, StepsInDirection];

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

const cacheKey = ([[x, y, direction], hl, steps]: Step): number =>
  (((x + 1) * 1000 + (y + 1)) * 1000 + direction) * 10 + (steps + 1);

export const getLeastHeatLoss = (input: string) => {
  const map = input.split("\n").map((line) => line.split("").map(Number));
  const endX = map[0].length - 1;
  const endY = map.length - 1;

  const startX = 0;
  const startY = 0;

  const startingStep: Step = [[startX, startY, D.E], 0, 0];

  const queue = new Heap<Step>(([, hlA], [, hlb]) => hlA - hlb);
  queue.push(startingStep);

  const visited = new Set<number>();
  visited.add(cacheKey(startingStep));

  while (queue.size() > 0) {
    const [[x, y, direction], heatLoss, steps] = queue.pop();

    if (x === endX && y === endY) return heatLoss;

    const nextPositions = getNextPositions[direction](x, y)
      .filter(([, , newDirection]) =>
        steps > 2 ? newDirection !== direction : true
      )
      .filter(([x, y]) => !(x < 0 || y < 0 || y > endY || x > endX));

    for (const [nextX, nextY, nextDirection] of nextPositions) {
      let nextStep: Step = [
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

  const startingStep: Step = [[startX, startY, D.E], 0, 0];

  const queue = new Heap<Step>(([, hlA], [, hlb]) => hlA - hlb);
  queue.push(startingStep);

  const visited = new Set<number>();
  visited.add(cacheKey(startingStep));

  while (queue.size() > 0) {
    const [[x, y, direction], heatLoss, steps] = queue.pop();

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
