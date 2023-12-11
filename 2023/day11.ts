import { createPairs, range } from "../util/utils";

const parseGalaxyMap = (
  map: string[][]
): [[number, number][], number[], number[]] => {
  const positions: [number, number][] = [];

  const emptyColumns = new Set(range(0, map.length));
  const emptyRows = new Set(range(0, map[0].length));

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

const getEmptyRowsBetweenPairs = (
  pair: [number, number][],
  emptyRows: number[]
): number => {
  const minY = Math.min(pair[0][1], pair[1][1]);
  const maxY = Math.max(pair[0][1], pair[1][1]);

  let count = 0;

  for (let i = 0; i < emptyRows.length; i++) {
    if (emptyRows[i] > minY && emptyRows[i] < maxY) {
      count++;
    }
  }

  return count;
};

const getEmptyColumnsBetweenPairs = (
  pair: [number, number][],
  emptyColumns: number[]
): number => {
  const minX = Math.min(pair[0][0], pair[1][0]);
  const maxX = Math.max(pair[0][0], pair[1][0]);
  let count = 0;

  for (let i = 0; i < emptyColumns.length; i++) {
    if (emptyColumns[i] > minX && emptyColumns[i] < maxX) {
      count++;
    }
  }

  return count;
};

export const getGalaxyDistanceSum = (
  input: string,
  expansionRate = 2
): number => {
  const galaxyMap = input.split("\n").map((line) => line.split(""));

  const [galaxyPositions, emptyRows, emptyColumns] = parseGalaxyMap(galaxyMap);

  const galaxyPairs = createPairs(galaxyPositions);

  let result = 0;

  for (let i = 0; i < galaxyPairs.length; i++) {
    const pair = galaxyPairs[i];

    const emptyRowsBetweenPairs = getEmptyRowsBetweenPairs(pair, emptyRows);
    const emptyColumnsBetweenPairs = getEmptyColumnsBetweenPairs(
      pair,
      emptyColumns
    );

    const expansion = expansionRate - 1;

    const minX = Math.min(pair[0][0], pair[1][0]);
    const maxX =
      Math.max(pair[0][0], pair[1][0]) + emptyColumnsBetweenPairs * expansion;

    const minY = Math.min(pair[0][1], pair[1][1]);
    const maxY =
      Math.max(pair[0][1], pair[1][1]) + emptyRowsBetweenPairs * expansion;

    const distance = maxX - minX + (maxY - minY);

    result += distance;
  }

  return result;
};
