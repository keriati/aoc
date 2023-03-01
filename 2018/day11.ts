export const getPowerLevel = (x: number, y: number, serial: number) => {
  const rackID = x + 10;
  const powerLevel = (y * rackID + serial) * rackID;
  return (
    parseInt(powerLevel.toString().split("").reverse()?.[2] || "0", 10) - 5
  );
};

export const getTotalPowerLevel = (
  serial: number,
  squareSize = 3,
  cache = new Map<string, number>()
): [number, number] => {
  let maxLevel = 0;
  let maxCell: [number, number] = [0, 0];

  for (let yo = 0; yo < 299 - squareSize; yo++) {
    for (let xo = 0; xo < 299 - squareSize; xo++) {
      let gridSum = 0;
      const cellStart: [number, number] = [xo, yo];

      for (let y = yo; y < yo + squareSize; y++) {
        for (let x = xo; x < xo + squareSize; x++) {
          const key = `${x},${y}`;

          if (cache.has(key)) {
            gridSum += cache.get(key);
            continue;
          }

          const level = getPowerLevel(x, y, serial);

          gridSum += level;
          cache.set(key, level);
        }
      }

      if (gridSum > maxLevel) {
        maxLevel = gridSum;
        maxCell = cellStart;
      }
    }
  }

  return maxCell;
};

export const getTotalPowerLevelVar = (serial) => {
  let maxPower = 0;
  let maxPos = [];
  let maxSize = 0;
  const posCache: number[][] = [];
  const gridCache: number[][][] = [];

  for (let y = 0; y < 300; y++) {
    posCache[y] = [];
    gridCache[y] = [];
    for (let x = 0; x < 300; x++) {
      const powerLevel = getPowerLevel(x, y, serial);
      posCache[y][x] = powerLevel;
      gridCache[y][x] = [];
      gridCache[y][x][1] = powerLevel;
    }
  }

  for (let size = 2; size < 300; size++) {
    for (let yo = 0; yo < 299 - size; yo++) {
      for (let xo = 0; xo < 299 - size; xo++) {
        let power = gridCache[yo][xo][size - 1];
        const pos: [number, number] = [xo, yo];

        for (let x = xo; x < xo + size; x++) {
          power += posCache[yo + size - 1][x];
        }

        for (let y = yo; y < yo + size - 1; y++) {
          power += posCache[y][xo + size - 1];
        }

        if (power > maxPower) {
          maxPower = power;
          maxPos = pos;
          maxSize = size;
        }

        gridCache[yo][xo][size] = power;
      }
    }
  }

  return [...maxPos, maxSize];
};
