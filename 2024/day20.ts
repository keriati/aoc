import { manhattanDistance } from "../util/matrix";
import { mk2n } from "../util/utils";

type Position = [number, number];

const getShortestPath = (
  map: string[][],
  start: Position,
  end: Position
): Position[] => {
  const queue: [Position, number][] = [[start, 0]];

  const visited = new Set<number>();
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const positions = [];

  while (queue.length > 0) {
    const [[x, y], steps] = queue.pop();

    positions.push([x, y]);

    if (x === end[0] && y === end[1]) return positions;

    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      const key = mk2n(nx, ny);

      if (visited.has(key) || map[ny][nx] === "#") {
        continue;
      }

      visited.add(key);
      queue.push([[nx, ny], steps + 1]);
    }
  }

  return [];
};

export const getCheatsCount = (
  input: string,
  maxCheats = 20,
  minSaved = 100
) => {
  const map = input.split("\n").map((line) => line.split(""));

  let start: Position;
  let end: Position;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "S") {
        start = [x, y];
      }
      if (map[y][x] === "E") {
        end = [x, y];
      }
    }
  }

  const shortestPath: Position[] = getShortestPath(map, start, end);

  let cheats = 0;

  for (let si = 0; si < shortestPath.length - minSaved; si++) {
    for (let ei = si + minSaved; ei < shortestPath.length; ei++) {
      const cheated = ei - si;

      const cheatDistance = manhattanDistance(
        shortestPath[si],
        shortestPath[ei]
      );

      if (cheatDistance <= maxCheats) {
        const saved = cheated - cheatDistance;
        if (saved >= minSaved) {
          cheats++;
        }
      }
    }
  }

  return cheats;
};
