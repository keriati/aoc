type Point = [number, number];

const parsePoints = (input) =>
  input
    .split("\n")
    .map((l) => l.split(", "))
    .map(([x, y]) => [Number(x), Number(y)]);

const getCorners = (points: Point[]) => {
  let xMin = 1000;
  let xMax = 0;
  let yMin = 1000;
  let yMax = 0;

  points.forEach(([x, y]) => {
    if (x < xMin) xMin = x;
    if (x > xMax) xMax = x;

    if (y < yMin) yMin = y;
    if (y > yMax) yMax = y;
  });

  return [
    [xMin, yMin],
    [xMax, yMax],
  ];
};

export const getResult = (input) => {
  const points = parsePoints(input);

  const [[sx, sy], [ex, ey]] = getCorners(points);

  const areas = new Map<number, number>();

  for (let y = sy; y <= ey; y++) {
    for (let x = sx; x <= ex; x++) {
      let minDistance = 1000;
      let occurrence = 0;
      let point = null;

      points.forEach(([px, py], i) => {
        const distance = Math.abs(x - px) + Math.abs(y - py);

        if (distance === minDistance) occurrence++;

        if (distance < minDistance) {
          minDistance = distance;
          occurrence = 1;
          point = i;
        }
      });

      if (occurrence === 1) {
        if (!areas.has(point)) areas.set(point, 0);
        areas.set(point, areas.get(point) + 1);
      }
    }
  }

  return Array.from(areas.values()).reduce((max, n) => (n > max ? n : max), 0);
};

export const getResult2 = (input, maxDistance) => {
  const points = parsePoints(input);

  const [[sx, sy], [ex, ey]] = getCorners(points);

  let safePoints = 0;

  for (let y = sy; y <= ey; y++) {
    for (let x = sx; x <= ex; x++) {
      let totalDistance = 0;

      points.forEach(([px, py], i) => {
        totalDistance += Math.abs(x - px) + Math.abs(y - py);
      });

      if (totalDistance < maxDistance) safePoints++;
    }
  }

  return safePoints;
};
