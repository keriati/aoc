const getStart = (lines: string[][]) => {
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === "^") {
        return [x, y];
      }
    }
  }
  throw new Error("Start not found");
};

const getVisitedPositions = (map: string[][]) => {
  let [sx, sy] = getStart(map);

  let vx = 0;
  let vy = -1;

  const visited: boolean[][] = [];

  for (let i = 0; i < map[0].length; i++) {
    visited[i] = [];
  }

  visited[sx][sy] = true;

  while (true) {
    if (
      sx + vx < 0 ||
      sy + vy < 0 ||
      sx + vx >= map[0].length ||
      sy + vy >= map.length
    ) {
      return visited;
    }

    if (map[sy + vy][sx + vx] === "#") {
      // turn right 90 degrees
      if (vx === 0 && vy === -1) {
        vx = 1;
        vy = 0;
      } else if (vx === 1 && vy === 0) {
        vx = 0;
        vy = 1;
      } else if (vx === 0 && vy === 1) {
        vx = -1;
        vy = 0;
      } else if (vx === -1 && vy === 0) {
        vx = 0;
        vy = -1;
      }
    }
    sx += vx;
    sy += vy;

    visited[sx][sy] = true;
  }
};

export const getGuardPositions = (input: string) => {
  const lines = input.split("\n").map((line) => line.split(""));

  return getVisitedPositions(lines).flat().filter(Boolean).length;
};

const hasLoop = (
  map: boolean[][],
  x: number,
  y: number,
  ox: number,
  oy: number
) => {
  let vx = 0;
  let vy = -1;
  const visited: boolean[] = [];

  while (true) {
    if (
      x + vx < 0 ||
      y + vy < 0 ||
      x + vx >= map.length ||
      y + vy >= map.length
    ) {
      return false;
    }

    if (map[y + vy][x + vx] || (x + vx === ox && y + vy === oy)) {
      const key = (x * 130 + y) * 10 + vx * 3 + vy * 5;

      if (visited[key]) {
        return true;
      }
      visited[key] = true;

      // turn right 90 degrees
      if (vx === 0 && vy === -1) {
        vx = 1;
        vy = 0;
      } else if (vx === 1 && vy === 0) {
        vx = 0;
        vy = 1;
      } else if (vx === 0 && vy === 1) {
        vx = -1;
        vy = 0;
      } else if (vx === -1 && vy === 0) {
        vx = 0;
        vy = -1;
      }
    } else {
      x += vx;
      y += vy;
    }
  }
};

export const getObstructionCount = (input: string) => {
  const mapRaw = input.split("\n").map((line) => line.split(""));

  const map: boolean[][] = [];

  for (let y = 0; y < mapRaw.length; y++) {
    map[y] = [];
    for (let x = 0; x < mapRaw[y].length; x++) {
      if (mapRaw[y][x] === "#") {
        map[y][x] = true;
      }
    }
  }

  const visited = getVisitedPositions(mapRaw);

  let result = 0;
  const [sx, sy] = getStart(mapRaw);

  for (let y = 0; y < mapRaw.length; y++) {
    for (let x = 0; x < mapRaw[y].length; x++) {
      // obstacles can only be placed to visited positions
      if (!visited[x][y]) {
        continue;
      }

      // exclude start position
      if (x === sx && y === sy) {
        continue;
      }

      // obstacle already there
      if (map[y][x]) {
        continue;
      }

      if (hasLoop(map, sx, sy, x, y)) {
        result++;
      }
    }
  }

  return result;
};
