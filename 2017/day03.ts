export const getResult = (input) => {
  let x = 0;
  let y = 0;
  let v = 0;
  let d = 1;

  while (true) {
    for (; x < d; x++) {
      v++;
      if (v === input) return Math.abs(x) + Math.abs(y);
    }

    for (; y < d; y++) {
      v++;
      if (v === input) return Math.abs(x) + Math.abs(y);
    }

    for (; x > -d; x--) {
      v++;
      if (v === input) return Math.abs(x) + Math.abs(y);
    }

    for (; y > -d; y--) {
      v++;
      if (v === input) return Math.abs(x) + Math.abs(y);
    }

    d++;
  }
};

const getVal = (x: number, y: number, mem: Map<string, number>) => {
  if (x === 0 && y === 0) return 1;

  const neighbours = [
    [x + 1, y],
    [x + 1, y + 1],
    [x, y + 1],
    [x - 1, y + 1],
    [x - 1, y],
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
  ];

  return neighbours.reduce(
    (sum, [x, y]) => (mem.has(`${x},${y}`) ? sum + mem.get(`${x},${y}`) : sum),
    0
  );
};

export const getResult2 = (input) => {
  const mem = new Map<string, number>();

  let x = 0;
  let y = 0;
  let d = 1;

  while (true) {
    for (; x < d; x++) {
      const v = getVal(x, y, mem);
      if (v > input) return v;
      mem.set(`${x},${y}`, v);
    }

    for (; y < d; y++) {
      const v = getVal(x, y, mem);
      if (v > input) return v;
      mem.set(`${x},${y}`, v);
    }

    for (; x > -d; x--) {
      const v = getVal(x, y, mem);
      if (v > input) return v;
      mem.set(`${x},${y}`, v);
    }

    for (; y > -d; y--) {
      const v = getVal(x, y, mem);
      if (v > input) return v;
      mem.set(`${x},${y}`, v);
    }

    d++;
  }
};
