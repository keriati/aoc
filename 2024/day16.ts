import { MinPriorityQueue } from "priority-queue-typed";
import { mk2n, mk3n } from "../util/utils";

type Position = [number, number, number];
type Score = number;
type Path = number[];

const parseInput = (input: string) => {
  const map = input.split("\n").map((l) => l.split(""));
  const start: Position = [0, 0, 90];
  const end: Position = [0, 0, 90];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === "S") {
        start[0] = x;
        start[1] = y;
      } else if (map[y][x] === "E") {
        end[0] = x;
        end[1] = y;
      }
    }
  }

  return { map, start, end };
};

export const getLowestScore = (input: string) => {
  const { map, start, end } = parseInput(input);

  const queue = new MinPriorityQueue<[Position, Score]>([], {
    comparator: (a, b) => a[1] - b[1],
  });
  queue.add([start, 0]);

  const visited = new Set<string>();

  while (queue.size > 0) {
    const [[x, y, direction], score] = queue.poll();

    if (x === end[0] && y === end[1]) {
      return score;
    }

    const key = `${x},${y},${direction}`;
    if (visited.has(key)) continue;

    visited.add(key);

    const neighbours = {
      0: [x, y - 1],
      90: [x + 1, y],
      180: [x, y + 1],
      270: [x - 1, y],
    };

    const [nx, ny] = neighbours[direction];
    if (map[ny]?.[nx] !== "#") {
      queue.add([[nx, ny, direction], score + 1]);
    }

    queue.add([[x, y, (direction + 90) % 360], score + 1000]);
    queue.add([[x, y, (direction + 270) % 360], score + 1000]);
  }

  return -1;
};

export const getTileCount = (input: string) => {
  const { map, start, end } = parseInput(input);

  const queue = new MinPriorityQueue<[Position, Score, Path]>([], {
    comparator: (a, b) => a[1] - b[1],
  });
  queue.add([start, 0, [mk2n(start[0], start[1])]]);

  const visited = new Map<number, number>();
  let pathPositions = new Set<number>();
  let minScore = Infinity;

  while (queue.size > 0) {
    const [[x, y, direction], score, path] = queue.poll();
    if (score > minScore) continue;

    if (x === end[0] && y === end[1]) {
      if (score > minScore) continue;

      if (score < minScore) {
        minScore = score;
        pathPositions = new Set<number>();
      }

      pathPositions = new Set<number>([...pathPositions, ...path]);
    }

    const key = mk3n(x, y, direction);
    if (visited.has(key) && visited.get(key) < score) continue;

    visited.set(key, score);

    if (direction === 0 && map[y - 1][x] !== "#") {
      queue.add([[x, y - 1, 0], score + 1, [...path, mk2n(x, y - 1)]]);
    } else if (direction === 90 && map[y][x + 1] !== "#") {
      queue.add([[x + 1, y, 90], score + 1, [...path, mk2n(x + 1, y)]]);
    } else if (direction === 180 && map[y + 1][x] !== "#") {
      queue.add([[x, y + 1, 180], score + 1, [...path, mk2n(x, y + 1)]]);
    } else if (direction === 270 && map[y][x - 1] !== "#") {
      queue.add([[x - 1, y, 270], score + 1, [...path, mk2n(x - 1, y)]]);
    }

    queue.add([[x, y, (direction + 90) % 360], score + 1000, [...path]]);
    queue.add([[x, y, (direction + 270) % 360], score + 1000, [...path]]);
  }

  return pathPositions.size;
};
