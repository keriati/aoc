import { defaultDict } from "../util/utils";

const gcd = (a: number, b: number) => (b === 0 ? a : gcd(b, a % b));

const getAngleInDeg = (x: number, y: number) => {
  let angle = Math.atan2(x, -y) - Math.atan2(0, -1);

  if (angle < 0) angle += 2 * Math.PI;

  return (angle * 180) / Math.PI;
};

const getAsteroids = (input: string) => {
  const astreroidMap = input
    .split("\n")
    .map((line) => line.split("").map((pos) => pos === "#"));

  const asteroids = new Map<string, [number, number]>();

  for (let y = 0; y < astreroidMap.length; y++) {
    for (let x = 0; x < astreroidMap[0].length; x++) {
      if (astreroidMap[y][x]) asteroids.set(`${x},${y}`, [x, y]);
    }
  }

  return asteroids;
};

const getVisibilityMap = (asteroids: Map<string, [number, number]>) => {
  const visibilityMap = defaultDict(0);

  asteroids.forEach(([x, y]) => {
    asteroids.forEach(([cx, cy], cKey) => {
      if (x === cx && y === cy) return;

      let visible = true;
      const vGcd = gcd(Math.abs(cx - x), Math.abs(cy - y));

      const vx = (cx - x) / vGcd;
      const vy = (cy - y) / vGcd;

      let tx = x + vx;
      let ty = y + vy;

      while (tx !== cx || ty !== cy) {
        if (asteroids.has(`${tx},${ty}`)) visible = false;
        tx += vx;
        ty += vy;
      }

      if (visible) {
        visibilityMap[`${x},${y}`]++;
      }
    });
  });

  return visibilityMap;
};

export const getBestAsteroid = (input) => {
  const asteroids = getAsteroids(input);

  const visibilityMap = getVisibilityMap(asteroids);

  return Object.values(visibilityMap).reduce(
    (max, n) => (n > max ? n : max),
    0
  );
};

const getDegreeDistanceMap = (
  asteroids: Map<string, [number, number]>,
  cx: number,
  cy: number
) => {
  const degreeDistanceMap = [];

  asteroids.forEach(([x, y]) => {
    if (x === cx && y === cy) return;

    const vx = cx - x;
    const vy = cy - y;

    const angle = getAngleInDeg(vx, vy);
    const distance = Math.abs(x - cx) + Math.abs(y - cy);

    degreeDistanceMap.push({ x, y, angle, distance });
  });

  degreeDistanceMap.sort(
    (a, b) => a.angle - b.angle || a.distance - b.distance
  );

  let lastAngle = null;
  let count = 1;

  degreeDistanceMap.forEach((pos) => {
    if (pos.angle !== lastAngle) {
      lastAngle = pos.angle;
      count = 1;
    } else {
      pos.angle += 360 * count;
      count++;
    }
  });

  degreeDistanceMap.sort((a, b) => a.angle - b.angle);

  return degreeDistanceMap;
};

export const get200th = (input) => {
  const asteroids = getAsteroids(input);

  const visibilityMap = getVisibilityMap(asteroids);

  let maxVisible = 0;
  let selected;

  for (const pos in visibilityMap) {
    if (visibilityMap[pos] > maxVisible) {
      selected = pos;
      maxVisible = visibilityMap[pos];
    }
  }

  const [cXs, cYs] = selected.split(",");

  const cx = Number(cXs);
  const cy = Number(cYs);

  const degreeDistanceMap = getDegreeDistanceMap(asteroids, cx, cy);

  return degreeDistanceMap[199].x * 100 + degreeDistanceMap[199].y;
};
