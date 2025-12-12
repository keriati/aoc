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
      const bx1 = Math.min(x1, x2);
      const bx2 = Math.max(x1, x2);
      const by1 = Math.min(y1, y2);
      const by2 = Math.max(y1, y2);

      let intersects = false;

      for (let i = 0; i < points.length; i++) {
        const [px1, py1] = points[i];
        const [px2, py2] = points[(i + 1) % points.length];

        if (
          !(
            Math.max(px1, px2) <= bx1 ||
            bx2 <= Math.min(px1, px2) ||
            Math.max(py1, py2) <= by1 ||
            by2 <= Math.min(py1, py2)
          )
        ) {
          intersects = true;
          break;
        }
      }

      if (!intersects) {
        const area = (bx2 - bx1 + 1) * (by2 - by1 + 1);
        if (area > maxArea) {
          maxArea = area;
        }
      }
    }
  }

  return maxArea;
};
