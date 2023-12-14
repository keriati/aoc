export const getLoad = (lines: string[][]) => {
  let result = 0;
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (char === "O") {
        result += lines.length - y;
      }
    }
  }
  return result;
};

const rollRocksNorth = (lines: string[][]) => {
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (char === "O") {
        let dy = y;
        while (dy > 0 && lines[dy - 1][x] === ".") {
          lines[dy - 1][x] = "O";
          lines[dy][x] = ".";
          dy--;
        }
      }
    }
  }
  return lines;
};

const rollRocksSouth = (lines: string[][]) => {
  for (let y = lines.length - 1; y >= 0; y--) {
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (char === "O") {
        let dy = y;
        while (dy < lines.length - 1 && lines[dy + 1][x] === ".") {
          lines[dy + 1][x] = "O";
          lines[dy][x] = ".";
          dy++;
        }
      }
    }
  }
  return lines;
};

const rollRocksWest = (lines: string[][]) => {
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (char === "O") {
        let dx = x;
        while (dx > 0 && lines[y][dx - 1] === ".") {
          lines[y][dx - 1] = "O";
          lines[y][dx] = ".";
          dx--;
        }
      }
    }
  }
  return lines;
};

const rollRocksEast = (lines: string[][]) => {
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (let x = line.length - 1; x >= 0; x--) {
      const char = line[x];
      if (char === "O") {
        let dx = x;
        while (dx < lines[y].length - 1 && lines[y][dx + 1] === ".") {
          lines[y][dx + 1] = "O";
          lines[y][dx] = ".";
          dx++;
        }
      }
    }
  }
  return lines;
};

export const getNorthSupportBeamsLoad = (input: string) =>
  getLoad(rollRocksNorth(input.split("\n").map((line) => line.split(""))));

const cycleRocks = (lines: string[][]) => {
  rollRocksNorth(lines);
  rollRocksWest(lines);
  rollRocksSouth(lines);
  rollRocksEast(lines);
  return lines;
};

export const getLoadAfterCycles = (input: string): number => {
  let rockMap = input.split("\n").map((line) => line.split(""));

  const visitedStates = new Map<string, number>();

  while (true) {
    cycleRocks(rockMap);
    const map = rockMap.map((line) => line.join("")).join("\n");

    if (visitedStates.has(map)) {
      if (visitedStates.get(map) === 2) {
        break;
      }
      visitedStates.set(map, 2);
    } else {
      visitedStates.set(map, 1);
    }
  }

  const cycleMaps = [];

  for (const [map, count] of visitedStates) {
    if (count === 2) {
      cycleMaps.push(map);
    }
  }

  const offset = visitedStates.size - cycleMaps.length;

  const index = (1000000000 - offset) % cycleMaps.length;

  const endState = cycleMaps[index - 1]
    .split("\n")
    .map((line) => line.split(""));

  return getLoad(endState);
};
