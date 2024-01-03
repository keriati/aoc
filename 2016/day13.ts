import { Deque } from "@blakeembrey/deque";

const isOfficeWall = (fav: number, x: number, y: number): boolean => {
  const val = x * x + 3 * x + 2 * x * y + y + y * y + fav;
  const bin = val.toString(2);
  let bits = 0;

  for (let i = 0; i < bin.length; i++) {
    if (bin[i] === "1") bits++;
  }

  return bits % 2 === 1;
};

const getNextSteps = (
  fav: number,
  tx: number,
  ty: number
): [number, number][] => {
  const nextSteps = [];
  if (!isOfficeWall(fav, tx + 1, ty)) {
    nextSteps.push([tx + 1, ty]);
  }

  if (tx > 0 && !isOfficeWall(fav, tx - 1, ty)) {
    nextSteps.push([tx - 1, ty]);
  }

  if (!isOfficeWall(fav, tx, ty + 1)) {
    nextSteps.push([tx, ty + 1]);
  }

  if (ty > 0 && !isOfficeWall(fav, tx, ty - 1)) {
    nextSteps.push([tx, ty - 1]);
  }

  return nextSteps;
};

const posHash = (x, y) => (x + 1) * 1000 + y + 1;

export const getFewestOfficeSteps = (fav: number, tx: number, ty: number) => {
  // [step,x,y]
  const q = new Deque<[number, number, number]>();
  q.push([0, 1, 1]);

  const visited = new Set();
  visited.add(posHash(1, 1));

  while (q.size > 0) {
    const [step, x, y] = q.popLeft();

    if (x === tx && y === ty) {
      return step;
    }

    const nextSteps = getNextSteps(fav, x, y);

    for (let i = 0; i < nextSteps.length; i++) {
      if (visited.has(posHash(nextSteps[i][0], nextSteps[i][1]))) continue;
      visited.add(posHash(x, y));
      q.push([step + 1, ...nextSteps[i]]);
    }
  }

  return 0;
};

export const getMaxReachablePositionCount = (fav: number) => {
  // [step,x,y]
  const q = new Deque<[number, number, number]>();
  q.push([0, 1, 1]);

  const visited = new Set();

  while (q.size > 0) {
    const [step, x, y] = q.popLeft();

    visited.add(posHash(x, y));

    if (step === 50) continue;

    const nextSteps = getNextSteps(fav, x, y);

    for (let i = 0; i < nextSteps.length; i++) {
      if (visited.has(posHash(nextSteps[i][0], nextSteps[i][1]))) continue;
      q.push([step + 1, ...nextSteps[i]]);
    }
  }

  return visited.size;
};
