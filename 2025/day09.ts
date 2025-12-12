type Point = [number, number];

export const getResult = (input: string) => {
  const points: Point[] = input
    .split("\n")
    .map((line) => line.split(",").map(Number) as Point);

  let maxArea = 0;

  for (const [x1, y1] of points) {
    for (const [x2, y2] of points) {
      const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);

      if (area > maxArea) {
        maxArea = area;
      }
    }
  }

  return maxArea;
};

export const getResultPart2 = (input: string) => {
  const points: Point[] = input
    .split("\n")
    .map((line) => line.split(",").map(Number) as Point);

  let maxArea = 0;

  for (const [x1, y1] of points) {
    for (const [x2, y2] of points) {
      const bxMin = Math.min(x1, x2);
      const bxMax = Math.max(x1, x2);
      const byMin = Math.min(y1, y2);
      const byMax = Math.max(y1, y2);

      let intersects = false;

      for (let i = 0; i < points.length; i++) {
        const [px1, py1] = points[i];
        const [px2, py2] = points[(i + 1) % points.length];

        const pxMax = Math.max(px1, px2);
        const pxMin = Math.min(px1, px2);
        const pyMax = Math.max(py1, py2);
        const pyMin = Math.min(py1, py2);

        if (pxMax > bxMin && bxMax > pxMin && pyMax > byMin && byMax > pyMin) {
          intersects = true;
          break;
        }
      }

      if (!intersects) {
        const area = (bxMax - bxMin + 1) * (byMax - byMin + 1);
        if (area > maxArea) {
          maxArea = area;
        }
      }
    }
  }

  return maxArea;
};
