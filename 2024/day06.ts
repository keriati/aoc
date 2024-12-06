function getStart(lines: string[][]) {
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === "^") {
        return [x, y];
      }
    }
  }
  throw new Error("Start not found");
}

function getVisitedPositions(map: string[][]) {
  let [sx, sy] = getStart(map);

  let vx = 0;
  let vy = -1;

  const visited = new Set<string>();

  visited.add(`${sx},${sy}`);

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

    visited.add(`${sx},${sy}`);
  }
}

export const getResult = (input: string) => {
  const lines = input.split("\n").map((line) => line.split(""));

  return getVisitedPositions(lines).size;
};

function hasLoop(
  lines: string[][],
  x: number,
  y: number,
  ox: number,
  oy: number
) {
  let vx = 0;
  let vy = -1;
  let steps = 0;
  // const visited = new Set<string>();
  // visited.add(`${x},${y},${vx},${vy}`);

  while (true && steps < 7000) {
    if (
      x + vx < 0 ||
      y + vy < 0 ||
      x + vx >= lines[y].length ||
      y + vy >= lines.length
    ) {
      return false;
    }

    if (lines[y + vy][x + vx] === "#" || (x + vx === ox && y + vy === oy)) {
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

    // let posdir = `${x},${y},${vx},${vy}`;

    // if (visited.has(posdir)) {
    //   return true;
    // }
    steps++;
  }

  return true;
}

export const getResultPart2 = (input: string) => {
  const lines = input.split("\n").map((line) => line.split(""));

  // const visited = getVisitedPositions(input);

  let result = 0;
  const [sx, sy] = getStart(lines);

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (x === sx && y === sy) {
        continue;
      }

      if (lines[y][x] === "#") {
        continue;
      }

      if (hasLoop(lines, sx, sy, x, y)) {
        // console.log(x, y);
        result++;
      }
    }
  }

  return result;
};
