import { Deque } from "@blakeembrey/deque";
import { mk2n, pairSInt } from "../util/utils";

const DH = {
  R: 1,
  L: -1,
  U: 0,
  D: 0,
};

const DV = {
  R: 0,
  L: 0,
  U: -1,
  D: 1,
};

const dig = (plan: [string, number][]) => {
  const trench = plan.reduce(
    (dig, [direction, meter]) => {
      let [x, y] = dig[dig.length - 1];
      const dx = DH[direction];
      const dy = DV[direction];
      for (let i = 0; i < meter; i++) {
        x += dx;
        y += dy;
        dig.push([x, y]);
      }
      return dig;
    },
    [[0, 0]]
  );

  const trenchSet = trench.reduce((set, [x, y]) => {
    set.add(pairSInt(x, y));
    return set;
  }, new Set<number>());

  let minX = Number.MAX_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;

  trench.forEach(([x, y]) => {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  });

  return { trenchSet, minX, minY, maxX, maxY, trench };
};

const parsePlan = (input: string): [string, number][] =>
  input
    .split("\n")
    .map((line) => line.split(" "))
    .map(([d, m]) => [d, Number(m)]);

export const getLavaAmount = (input: string) => {
  const plan = parsePlan(input);

  const { trenchSet, minX, minY, maxX, maxY } = dig(plan);

  let dy = minY < 0 ? Math.abs(minY) : 0;
  let dx = minX < 0 ? Math.abs(minX) : 0;

  const map: boolean[][] = [];

  for (let y = 0; y <= maxY + dy; y++) {
    map[y] = [];
    for (let x = 0; x <= maxX + dx; x++) {
      map[y][x] = trenchSet.has(pairSInt(x - dx, y - dy));
    }
  }

  const startX = Math.floor(map[0].length / 2);
  const startY = Math.floor(map.length / 2);

  const q = new Deque<[number, number]>();
  q.push([startX, startY]);

  const visited = new Set<number>();
  visited.add(pairSInt(startX, startY));

  while (q.size > 0) {
    const [x, y] = q.popLeft();

    map[y][x] = true;

    [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ].forEach(([x, y]) => {
      if (map?.[y]?.[x] === false && !visited.has(mk2n(x, y))) {
        visited.add(mk2n(x, y));
        q.push([x, y]);
      }
    });
  }

  return map.flatMap((p) => p).filter((p) => p).length;
};

const DM = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const parsePlanP2 = (input: string): [number, number][] =>
  input
    .split("\n")
    .map((line) => line.split(" "))
    .map(([, , s]) => s.replaceAll(/[#()]/g, ""))
    .map((s) => [Number(s.slice(5)), parseInt(s.slice(0, 5), 16)]);

export const getLavaAmountLarge = (input: string) => {
  const plan = parsePlanP2(input);

  const corners = [];

  let x = 0;
  let y = 0;

  let perimeter = 0;

  for (const [direction, distance] of plan) {
    x += DM[direction][0] * distance;
    y += DM[direction][1] * distance;
    perimeter += distance;
    corners.push([x, y]);
  }

  let area = 0;

  for (let i = 0; i < corners.length - 1; i++) {
    area +=
      (corners[i][0] - corners[i + 1][0]) * (corners[i][1] + corners[i + 1][1]);
  }

  return (area + perimeter) / 2 + 1;
};
