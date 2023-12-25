import { Deque } from "@blakeembrey/deque";
import { mk2n, umk2n } from "../util/utils";
import { graphViz } from "../util/graphviz";

export const getLongestHikeSlippery = (input: string) => {
  const map = input.split("\n").map((line) => line.split(""));

  const startX = 1;
  const startY = 0;

  const endX = map[0].length - 2;
  const endY = map.length - 1;

  const queue = new Deque<[number, number, number, number[]]>([
    [startX, startY, 0, [mk2n(startX, startY)]],
  ]);

  const hikes = [];

  while (queue.size > 0) {
    const [x, y, steps, visited] = queue.popLeft();

    if (x === endX && y === endY) {
      hikes.push(steps);
    }

    const neighbors = [];

    const tile = map[y][x];

    if (tile === ".") {
      if (map[y]?.[x - 1] !== ">") neighbors.push([x - 1, y]);
      if (map[y]?.[x + 1] !== "<") neighbors.push([x + 1, y]);
      if (map[y - 1]?.[x] !== "v") neighbors.push([x, y - 1]);
      if (map[y + 1]?.[x] !== "^") neighbors.push([x, y + 1]);
    } else {
      if (tile === ">") neighbors.push([x + 1, y]);
      if (tile === "<") neighbors.push([x - 1, y]);
      if (tile === "^") neighbors.push([x, y - 1]);
      if (tile === "v") neighbors.push([x, y + 1]);
    }

    for (const [nx, ny] of neighbors) {
      if (
        nx < 0 ||
        ny < 0 ||
        nx >= map[0].length ||
        ny >= map.length ||
        map[ny][nx] === "#"
      ) {
        continue;
      }

      const key = mk2n(nx, ny);

      if (!visited.includes(key)) {
        queue.push([nx, ny, steps + 1, [...visited, key]]);
      }
    }
  }

  return hikes.sort((a, b) => b - a)[0];
};

const getIntersections = (map: string[][]): number[] => {
  const intersections = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === ".") {
        let neighbors = [
          map[y][x - 1],
          map[y][x + 1],
          map[y - 1]?.[x],
          map[y + 1]?.[x],
        ].filter((x) => x === "#");

        if (neighbors.length < 2) {
          intersections.push(mk2n(x, y));
        }
      }
    }
  }

  return intersections;
};

const getConnections = (
  map: string[][],
  intersections: number[]
): Map<number, [number, number][]> => {
  const connections = new Map<number, [number, number][]>();

  for (const intersection of intersections) {
    connections.set(intersection, []);
  }

  for (const intersection of intersections) {
    const [x, y] = umk2n(intersection);

    const queue = [[x, y, 0]];
    const visited = new Set<number>([intersection]);

    while (queue.length > 0) {
      const [x, y, distance] = queue.pop();

      if (distance !== 0 && intersections.includes(mk2n(x, y))) {
        connections.get(intersection).push([mk2n(x, y), distance]);
        continue;
      }

      const neighbors = [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
      ].filter(
        ([x, y]) =>
          x >= 0 &&
          y >= 0 &&
          x < map[0].length &&
          y < map.length &&
          map[y][x] !== "#"
      );

      for (const [nx, ny] of neighbors) {
        if (!visited.has(mk2n(nx, ny))) {
          queue.push([nx, ny, distance + 1]);
          visited.add(mk2n(nx, ny));
        }
      }
    }
  }

  return connections;
};

const getLongestPath = (
  connections: Map<number, [number, number][]>,
  current: number,
  end: number,
  visited = new Set<number>()
) => {
  if (current === end) return 0;

  let maxDistance = Number.MIN_SAFE_INTEGER;

  visited.add(current);

  for (let [neighbour, distance] of connections.get(current)) {
    if (!visited.has(neighbour)) {
      maxDistance = Math.max(
        maxDistance,
        distance + getLongestPath(connections, neighbour, end, visited)
      );
    }
  }

  visited.delete(current);

  return maxDistance;
};

export const getLongestHike = (input: string) => {
  const map = input.split("\n").map((line) => line.split(""));

  const start = mk2n(1, 0);
  const end = mk2n(map[0].length - 2, map.length - 1);

  const intersections = [start, end, ...getIntersections(map)];

  const connections = getConnections(map, intersections);

  // const connectionsArray: [number, number[]][] = [...connections.entries()].map(
  //   ([start, ends]) => [start, ends.map(([end, distance]) => end)]
  // );
  //
  // graphViz(connectionsArray).render("aoc2023d23");

  return getLongestPath(connections, start, end);
};
