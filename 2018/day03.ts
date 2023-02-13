const getSquares = (input) =>
  input.split("\n").map((line) => {
    const [, id, p2, p3, p4, p5] = line.match(
      /(\d+) @ (\d+),(\d+): (\d+)x(\d+)/
    );
    const x = Number(p2);
    const y = Number(p3);
    const w = Number(p4);
    const h = Number(p5);
    return [id, x, y, w, h];
  });

const getPositions = (squares) => {
  const positions = new Map<string, number>();

  for (const [, x, y, w, h] of squares) {
    for (let dy = y; dy < y + h; dy++) {
      for (let dx = x; dx < x + w; dx++) {
        const pos = `${dx},${dy}`;

        if (!positions.has(pos)) positions.set(pos, 0);
        positions.set(pos, positions.get(pos) + 1);
      }
    }
  }

  return positions;
};

export const getOverlappingSquares = (input) => {
  const squares = getSquares(input);
  const positions = getPositions(squares);

  return Array.from(positions.values()).reduce(
    (s, v) => (v > 1 ? 1 + s : s),
    0
  );
};

export const getNonOverlappingId = (input) => {
  const squares = getSquares(input);
  const positions = getPositions(squares);

  for (const [id, x, y, w, h] of squares) {
    let hasOverlap = false;

    for (let dy = y; dy < y + h; dy++) {
      for (let dx = x; dx < x + w; dx++) {
        const pos = `${dx},${dy}`;
        if (positions.get(pos) > 1) hasOverlap = true;
      }
    }

    if (hasOverlap === false) return id;
  }

  return null;
};
