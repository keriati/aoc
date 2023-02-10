const parseWire = (line1) =>
  line1.split(",").map((ins) => [ins[0], parseInt(ins.substring(1), 10)]);

const getWireSteps = (wire: [string, number][]) => {
  let x = 0;
  let y = 0;
  const positions = [];

  wire.forEach(([d, val], i) => {
    if (d === "R") {
      for (const t = x + val; x < t; x += 1) {
        positions.push(`${x},${y}`);
      }
    }

    if (d === "L") {
      for (const t = x - val; x > t; x -= 1) {
        positions.push(`${x},${y}`);
      }
    }

    if (d === "U") {
      for (const t = y + val; y < t; y += 1) {
        positions.push(`${x},${y}`);
      }
    }

    if (d === "D") {
      for (const t = y - val; y > t; y -= 1) {
        positions.push(`${x},${y}`);
      }
    }
  });

  return positions;
};

const getIntersections = (w1positions: string[], w2positions: string[]) => {
  const w2p = new Set(w2positions);
  return Array.from(w1positions)
    .filter((pos) => w2p.has(pos))
    .map((pos) => {
      const x = parseInt(pos.split(",")[0], 10);
      const y = parseInt(pos.split(",")[1], 10);

      return [
        Math.abs(x) + Math.abs(y),
        w1positions.indexOf(pos) + w2positions.indexOf(pos),
      ];
    });
};

export const getDistances = (input) => {
  const [line1, line2] = input.split("\n");

  const wire1 = parseWire(line1);
  const wire2 = parseWire(line2);

  const w1positions = getWireSteps(wire1);
  const w2positions = getWireSteps(wire2);

  const intersections = getIntersections(w1positions, w2positions);

  intersections.sort(([a], [b]) => a - b);

  const manhattenDistance = intersections[1][0];

  intersections.sort(([, a], [, b]) => a - b);

  const steps = intersections[1][1];

  return [manhattenDistance, steps];
};
