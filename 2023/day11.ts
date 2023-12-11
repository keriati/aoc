import { createPairs, range } from "../util/utils";

const parseGalaxyMap = (
  map: string[][]
): [[number, number][], number[], number[]] => {
  const positions: [number, number][] = [];

  const emptyColumns = new Set<number>(range(0, map.length));
  const emptyRows = new Set<number>(range(0, map[0].length));

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "#") {
        positions.push([x, y]);
        emptyColumns.delete(y);
        emptyRows.delete(x);
      }
    }
  }

  return [positions, Array.from(emptyColumns), Array.from(emptyRows)];
};

const expandPositions = (
  galaxyPositions: [number, number][],
  emptyRows: number[],
  emptyColumns: number[],
  expansionRate: number
) =>
  galaxyPositions.map(([x, y]) => {
    const rowsBefore = emptyRows.filter((row) => row < y);
    const columnsBefore = emptyColumns.filter((column) => column < x);

    return [
      x + columnsBefore.length * (expansionRate - 1),
      y + rowsBefore.length * (expansionRate - 1),
    ];
  });

export const getGalaxyDistanceSum = (
  input: string,
  expansionRate = 2
): number => {
  const galaxyMap = input.split("\n").map((line) => line.split(""));

  const [galaxyPositions, emptyRows, emptyColumns] = parseGalaxyMap(galaxyMap);

  const expandedPositions = expandPositions(
    galaxyPositions,
    emptyRows,
    emptyColumns,
    expansionRate
  );

  const galaxyPairs = createPairs(expandedPositions);

  return galaxyPairs.reduce(
    (sum, pair) =>
      sum +
      Math.abs(pair[0][0] - pair[1][0]) +
      Math.abs(pair[0][1] - pair[1][1]),
    0
  );
};
