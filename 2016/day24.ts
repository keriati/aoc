import { BucketQueue } from "bucket-priority-queue";
import { createPairs, mk2n } from "../util/utils";
import { graphViz } from "../util/graphviz";

type Position = [number, number];

const getNeighbours = (x: number, y: number, map: string[][]): Position[] => {
  const neighbours: [number, number][] = [];

  if (map[y - 1][x] !== "#") {
    neighbours.push([x, y - 1]);
  }
  if (map[y + 1][x] !== "#") {
    neighbours.push([x, y + 1]);
  }
  if (map[y][x - 1] !== "#") {
    neighbours.push([x - 1, y]);
  }
  if (map[y][x + 1] !== "#") {
    neighbours.push([x + 1, y]);
  }

  return neighbours;
};

const findShortestPath = (
  start: Position,
  end: Position,
  map: string[][]
): number => {
  const queue = new BucketQueue<[Position, number]>();
  queue.push([start, 0], 0);
  const visited = new Set([mk2n(start[0], start[1])]);

  while (queue.size > 0) {
    const [[x, y], steps] = queue.popLowest();

    if (x === end[0] && y === end[1]) {
      return steps;
    }

    const neighbours = getNeighbours(x, y, map);

    for (const [nx, ny] of neighbours) {
      const n = mk2n(nx, ny);
      if (visited.has(n)) {
        continue;
      }
      visited.add(n);
      queue.push([[nx, ny], steps + 1], steps + 1);
    }
  }
  return -1;
};

const getPosition = (map: string[][], number: string): Position => {
  const startLine = map.filter((l) => l.includes(number))[0];
  return [startLine.indexOf(number), map.indexOf(startLine)];
};

const getPath = (
  connections: Map<string, [string, number][]>,
  current: string,
  returnTo0 = false,
  visited = new Set<string>()
) => {
  if (!returnTo0 && visited.size === connections.size - 1) return 0;
  if (returnTo0 && visited.size === connections.size) return 0;

  let totalDistance = Number.MAX_SAFE_INTEGER;

  visited.add(current);

  for (let [neighbour, distance] of connections.get(current)) {
    if (
      !visited.has(neighbour) ||
      (returnTo0 && visited.size === connections.size && neighbour === "0")
    ) {
      totalDistance = Math.min(
        totalDistance,
        distance + getPath(connections, neighbour, returnTo0, visited)
      );
    }
  }

  visited.delete(current);

  return totalDistance;
};

export const getFewestSteps = (input: string, returnTo0 = false) => {
  const map = input.split("\n").map((l) => l.split(""));

  const numbers = map.flat().filter((c) => !Number.isNaN(parseInt(c, 10)));

  const pairs = createPairs(numbers);

  const collapsedMap: Map<string, [string, number][]> = new Map();

  for (const number of numbers) {
    collapsedMap.set(number, []);
  }

  for (const [a, b] of pairs) {
    const start = getPosition(map, a);
    const end = getPosition(map, b);

    const distance = findShortestPath(start, end, map);

    collapsedMap.set(a, [...collapsedMap.get(a), [b, distance]]);
    collapsedMap.set(b, [...collapsedMap.get(b), [a, distance]]);
  }

  graphViz(Array.from(collapsedMap)).layout("circo").render("2016day24");

  return getPath(collapsedMap, "0", returnTo0);
};
