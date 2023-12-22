import { Deque } from "@blakeembrey/deque";
import { ABC_UPPER } from "../util/utils";

class Brick {
  constructor(
    public n: string,
    public x1: number,
    public y1: number,
    public z1: number,
    public x2: number,
    public y2: number,
    public z2: number
  ) {}
}

type BrickMap = Map<Brick, Brick[]>;

const posKey = (x: number, y: number, z: number) => (z * 100 + y) * 10 + x;

const parseBricks = (input: string): Brick[] =>
  input
    .split("\n")
    .map((line): number[] => line.replaceAll("~", ",").split(",").map(Number))
    .map(
      ([x1, y1, z1, x2, y2, z2], nr) =>
        new Brick(
          `${ABC_UPPER[nr % ABC_UPPER.length]}-${nr}`,
          x1,
          y1,
          z1,
          x2,
          y2,
          z2
        )
    );

const isSupporting = (bottomBrick: Brick, topBrick: Brick) => {
  if (bottomBrick.z2 + 1 !== topBrick.z1) {
    return false;
  }

  if (bottomBrick.x1 > topBrick.x2 || bottomBrick.x2 < topBrick.x1) {
    return false;
  }

  if (bottomBrick.y1 > topBrick.y2 || bottomBrick.y2 < topBrick.y1) {
    return false;
  }

  return true;
};

const getBottomTop = (bricks: Brick[]): Record<string, BrickMap> => {
  const bottoms = new Map<Brick, Brick[]>();
  const tops = new Map<Brick, Brick[]>();

  for (let i = 0; i < bricks.length; i++) {
    bottoms.set(bricks[i], []);
    tops.set(bricks[i], []);
  }

  bricks.sort((a, b) => a.z1 - b.z1);

  for (let i = 0; i < bricks.length - 1; i++) {
    const bottomBrick = bricks[i];

    for (let j = i + 1; j < bricks.length; j++) {
      const topBrick = bricks[j];

      if (isSupporting(bottomBrick, topBrick)) {
        bottoms.set(topBrick, [...bottoms.get(topBrick), bottomBrick]);
        tops.set(bottomBrick, [...tops.get(bottomBrick), topBrick]);
      }
    }
  }

  return { bottoms, tops };
};

const canFallOne = (brickSet: Set<number>, brick: Brick) => {
  if (brick.z1 === 0) return false;

  for (let x = brick.x1; x <= brick.x2; x++) {
    for (let y = brick.y1; y <= brick.y2; y++) {
      if (brickSet.has(posKey(x, y, brick.z1 - 1))) {
        return false;
      }
    }
  }

  return true;
};

const addBrickToSet = (brickSet: Set<number>, brick: Brick) => {
  for (let x = brick.x1; x <= brick.x2; x++) {
    for (let y = brick.y1; y <= brick.y2; y++) {
      for (let z = brick.z1; z <= brick.z2; z++) {
        brickSet.add(posKey(x, y, z));
      }
    }
  }
};

const deleteBrickFromSet = (brickSet: Set<number>, brick: Brick) => {
  for (let x = brick.x1; x <= brick.x2; x++) {
    for (let y = brick.y1; y <= brick.y2; y++) {
      for (let z = brick.z1; z <= brick.z2; z++) {
        brickSet.delete(posKey(x, y, z));
      }
    }
  }
};

const settle = (bricks: Brick[]) => {
  const brickSet = new Set<number>();

  bricks.sort((a, b) => a.z1 - b.z1);

  for (const brick of bricks) {
    addBrickToSet(brickSet, brick);
  }

  for (const brick of bricks) {
    let canFall = true;

    while (canFall) {
      canFall = canFallOne(brickSet, brick);

      if (canFall) {
        deleteBrickFromSet(brickSet, brick);

        brick.z1--;
        brick.z2--;

        addBrickToSet(brickSet, brick);
      }
    }
  }
};

export const getDisintegrating = (input: string) => {
  const bricks = parseBricks(input);

  settle(bricks);

  const { bottoms, tops } = getBottomTop(bricks);

  let disintegrating = 0;

  for (const brick of bricks) {
    const topBricks = tops.get(brick);
    if (topBricks.length === 0) {
      disintegrating++;
      continue;
    }

    let canDisintegrate = true;

    for (const topBrick of topBricks) {
      const supportingBricks = bottoms.get(topBrick).length;

      if (supportingBricks === 1) {
        canDisintegrate = false;
        break;
      }
    }

    if (canDisintegrate) {
      disintegrating++;
    }
  }

  return disintegrating;
};

const getFalling = (
  brick: Brick,
  tops: Map<Brick, Brick[]>,
  bottoms: Map<Brick, Brick[]>
) => {
  const queue = new Deque<Brick>([brick]);
  const falling = new Set<Brick>([brick]);

  while (queue.size > 0) {
    const current = queue.popLeft();

    const topBricks = tops.get(current);

    for (const topBrick of topBricks) {
      const supportingBricks = bottoms.get(topBrick);

      const isFalling = supportingBricks.every((supportingBrick) =>
        falling.has(supportingBrick)
      );

      if (isFalling) {
        falling.add(topBrick);
        queue.push(topBrick);
      }
    }

    if (queue.size === 0) return falling.size - 1;
  }

  return -1;
};

export const getFallingBricks = (input: string) => {
  const bricks = parseBricks(input);

  settle(bricks);

  const { bottoms, tops } = getBottomTop(bricks);

  let totalFall = 0;

  for (const brick of bricks) {
    totalFall += getFalling(brick, tops, bottoms);
  }

  return totalFall;
};
