export const transpose = <T>(matrix: T[][]) =>
  matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));

export function rotateClockwise<T>(matrix: T[][]) {
  return matrix[0].map((_value, index) =>
    matrix.map((row) => row[index]).reverse()
  );
}

export function rotateCounterClockwise<T>(matrix: T[][]) {
  return matrix[0].map((_val, index) =>
    matrix.map((row) => row[row.length - 1 - index])
  );
}

export function manhattanDistance(
  a: [number, number],
  b: [number, number]
): number {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}
