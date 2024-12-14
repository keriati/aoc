import { range } from "../util/utils";

type Robot = {
  px: number;
  py: number;
  vx: number;
  vy: number;
};

const moveRobot = (r: Robot, w: number, h: number) => {
  r.px = (r.px + r.vx + w) % w;
  r.py = (r.py + r.vy + h) % h;
  return r;
};

const parseInput = (input: string): Robot[] =>
  input
    .split("\n")
    .map((l) => l.match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/).map(Number))
    .map(([, px, py, vx, vy]) => ({ px, py, vx, vy }));

export const getSafetyFactor = (input: string, w: number, h: number) =>
  parseInput(input)
    .map((r) => range(0, 100).reduce((r: Robot) => moveRobot(r, w, h), r))
    .reduce(
      (acc, r) => {
        if (r.px < (w - 1) / 2 && r.py < (h - 1) / 2) acc[0]++;
        if (r.px > (w - 1) / 2 && r.py < (h - 1) / 2) acc[1]++;
        if (r.px < (w - 1) / 2 && r.py > (h - 1) / 2) acc[2]++;
        if (r.px > (w - 1) / 2 && r.py > (h - 1) / 2) acc[3]++;

        return acc;
      },
      [0, 0, 0, 0]
    )
    .reduce((acc: number, v: number) => acc * v, 1);

export const getEESeconds = (input: string, w: number, h: number) => {
  const robots = parseInput(input);

  return range(1, 10000).find(() => {
    robots.forEach((r) => moveRobot(r, w, h));

    const positions = new Set<string>();

    return robots.every((r) => {
      const key = `${r.px},${r.py}`;
      return !positions.has(key) && positions.add(key);
    });
  });
};
