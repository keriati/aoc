type Position = [number, number];

class SensorBeaconPair {
  public readonly distance: number;

  constructor(
    public readonly sx: number,
    public readonly sy: number,
    public readonly bx: number,
    public readonly by: number
  ) {
    this.distance = this.getDistance(bx, by);
  }

  public getDistance = (x, y) => Math.abs(x - this.sx) + Math.abs(y - this.sy);

  public static createFromDescription(description): SensorBeaconPair {
    const [a, sx, sy, bx, by] = description.match(
      /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/
    );

    return new SensorBeaconPair(
      Number.parseInt(sx, 10),
      Number.parseInt(sy, 10),
      Number.parseInt(bx, 10),
      Number.parseInt(by, 10)
    );
  }
}

function getCoveredPointsAtLine(pairs: SensorBeaconPair[], line): Set<number> {
  const yCovered = new Set<number>();

  for (let j = 0; j < pairs.length; j += 1) {
    const pair = pairs[j];
    const { sx, sy, distance } = pair;
    if (sy - distance <= line && sy + distance >= line) {
      const xDistance = Math.abs(sy - line);
      const yXStart = sx - distance + xDistance;
      const yXEnd = sx + distance - xDistance;

      for (let i = yXStart; i <= yXEnd; i += 1) {
        yCovered.add(i);
      }
    }
  }

  return yCovered;
}

function isPositionCovered(pairs: SensorBeaconPair[], position: Position) {
  const [x, y] = position;
  let isCovered = false;

  pairs.find((pair) => {
    const { distance } = pair;
    const myDistance = pair.getDistance(x, y);

    if (myDistance <= distance) {
      isCovered = true;
      return true;
    }

    return false;
  });

  return isCovered;
}

export const getCoveredPositionsAtLine = (input, line) => {
  const reports = input.split("\n");

  const pairs = reports.map(SensorBeaconPair.createFromDescription);

  const lineCovered = getCoveredPointsAtLine(pairs, line);

  return lineCovered.size - 1;
};

function findUncoveredPosition(
  start: number,
  end: number,
  pairs: SensorBeaconPair[]
): Position {
  let result: Position = [0, 0];

  pairs.find(({ sx, sy, distance }) => {
    const quarters = {
      q1: {
        x: {
          start: sx,
          end: sx + distance + 1,
        },
        y: {
          start: sy - distance - 1,
          end: sy,
        },
      },
      q2: {
        x: {
          start: sx + distance + 1,
          end: sx,
        },
        y: {
          start: sy,
          end: sy + distance + 1,
        },
      },
      q3: {
        x: {
          start: sx,
          end: sx - distance - 1,
        },
        y: {
          start: sy + distance + 1,
          end: sy,
        },
      },
      q4: {
        x: {
          start: sx - distance - 1,
          end: sx,
        },
        y: {
          start: sy,
          end: sy - distance - 1,
        },
      },
    };

    for (
      let x = quarters.q1.x.start, y = quarters.q1.y.start;
      x <= quarters.q1.x.end;
      x += 1, y += 1
    ) {
      if (x > end || x < start || y > end || y < start) {
        continue;
      }
      if (!isPositionCovered(pairs, [x, y])) {
        result = [x, y];
        return true;
      }
    }

    for (
      let x = quarters.q2.x.start, y = quarters.q2.y.start;
      x <= quarters.q2.x.end;
      x += 1, y -= 1
    ) {
      if (x > end || x < start || y > end || y < start) {
        continue;
      }
      if (!isPositionCovered(pairs, [x, y])) {
        result = [x, y];
        return true;
      }
    }

    for (
      let x = quarters.q3.x.start, y = quarters.q3.y.start;
      x >= quarters.q3.x.end;
      x -= 1, y -= 1
    ) {
      if (x > end || x < start || y > end || y < start) {
        continue;
      }
      if (!isPositionCovered(pairs, [x, y])) {
        result = [x, y];
        return true;
      }
    }

    for (
      let x = quarters.q4.x.start, y = quarters.q3.y.start;
      x <= quarters.q4.x.end;
      x += 1, y -= 1
    ) {
      if (x > end || x < start || y > end || y < start) {
        continue;
      }
      if (!isPositionCovered(pairs, [x, y])) {
        result = [x, y];
        return true;
      }
    }

    return false;
  });

  return result;
}

export const getBeaconPosition = (input, [start, end]) => {
  const reports = input.split("\n");

  const pairs: SensorBeaconPair[] = reports.map(
    SensorBeaconPair.createFromDescription
  );

  const [x, y] = findUncoveredPosition(start, end, pairs);

  return x * 4000000 + y;
};
