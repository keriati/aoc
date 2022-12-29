/* eslint-disable no-continue */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export type World = Record<string, "#" | "o">;

function getPosition(positionString: string): [number, number] {
  return [
    Number.parseInt(positionString.split(",")[0], 10),
    Number.parseInt(positionString.split(",")[1], 10),
  ];
}

function getSmaller(a: number, b: number) {
  return a > b ? b : a;
}

function getBigger(a: number, b: number) {
  return a > b ? a : b;
}

export const getWorld = (walls: string[]) => {
  const world: World = {};

  walls.forEach((wall) => {
    const wallParts = wall.split(" -> ");

    wallParts.forEach((wallPart, i) => {
      if (!wallParts[i + 1]) {
        return;
      }

      const startPosition = getPosition(wallPart);
      const endPosition = getPosition(wallParts[i + 1]);

      if (startPosition[0] === endPosition[0]) {
        const start = getSmaller(startPosition[1], endPosition[1]);
        const end = getBigger(endPosition[1], startPosition[1]);

        for (let j = start; j <= end; j += 1) {
          world[`${startPosition[0]},${j}`] = "#";
        }
        return;
      }

      const start = getSmaller(startPosition[0], endPosition[0]);
      const end = getBigger(endPosition[0], startPosition[0]);

      for (let j = start; j <= end; j += 1) {
        world[`${j},${startPosition[1]}`] = "#";
      }
    });
  });
  return world;
};

function getArea(world: World) {
  let startX = Number.MAX_SAFE_INTEGER;
  let endX = 0;
  const startY = 0;
  let endY = 0;

  Object.keys(world).forEach((position) => {
    const [x, y] = getPosition(position);
    if (x < startX) startX = x;
    if (x > endX) endX = x;
    if (y > endY) endY = y;
  });

  return { startX, endX, startY, endY };
}

export const getMap = (world: World) => {
  const { startX, endX, endY } = getArea(world);

  let map = "";

  for (let y = 0; y <= endY; y += 1) {
    map += `\n$`;
    for (let x = startX; x <= endX; x += 1) {
      if (world[`${x},${y}`]) {
        map += world[`${x},${y}`];
      } else {
        map += " ";
      }
    }
  }

  return map;
};

function canMoveDown([x, y]: number[], world: World) {
  return !["#", "o"].includes(world[`${x},${y + 1}`]);
}

function canMoveLeft([x, y]: number[], world: World) {
  return !["#", "o"].includes(world[`${x - 1},${y + 1}`]);
}

function canMoveRight([x, y]: number[], world: World) {
  return !["#", "o"].includes(world[`${x + 1},${y + 1}`]);
}

export const getSandUnitsWithoutFloor = (input) => {
  const walls = input.split("\n");
  const world = getWorld(walls);
  const { endY } = getArea(world);

  let fellOff = false;
  let sandPosition = [500, 0];
  let sandUnit = 0;

  while (!fellOff) {
    if (sandPosition[1] > endY) {
      fellOff = true;
    }

    if (canMoveDown(sandPosition, world)) {
      sandPosition = [sandPosition[0], sandPosition[1] + 1];
      continue;
    }

    if (canMoveLeft(sandPosition, world)) {
      sandPosition = [sandPosition[0] - 1, sandPosition[1] + 1];
      continue;
    }

    if (canMoveRight(sandPosition, world)) {
      sandPosition = [sandPosition[0] + 1, sandPosition[1] + 1];
      continue;
    }

    world[`${sandPosition[0]},${sandPosition[1]}`] = "o";
    sandPosition = [500, 0];
    sandUnit += 1;
  }

  // console.log(getMap(world));

  return sandUnit;
};

export const getSandUnitsWithFloor = (input) => {
  const walls = input.split("\n");
  const world = getWorld(walls);
  const { endY } = getArea(world);
  const floor = endY + 2;

  let entryBlocked = false;
  let sandPosition = [500, 0];
  let sandUnit = 0;

  while (!entryBlocked) {
    if (sandPosition[1] === floor - 1) {
      world[`${sandPosition[0]},${sandPosition[1]}`] = "o";
      sandPosition = [500, 0];
      sandUnit += 1;
    }

    if (canMoveDown(sandPosition, world)) {
      sandPosition = [sandPosition[0], sandPosition[1] + 1];
      continue;
    }

    if (canMoveLeft(sandPosition, world)) {
      sandPosition = [sandPosition[0] - 1, sandPosition[1] + 1];
      continue;
    }

    if (canMoveRight(sandPosition, world)) {
      sandPosition = [sandPosition[0] + 1, sandPosition[1] + 1];
      continue;
    }

    if (sandPosition[0] === 500 && sandPosition[1] === 0) {
      world[`${sandPosition[0]},${sandPosition[1]}`] = "o";
      sandUnit += 1;
      entryBlocked = true;
      continue;
    }

    world[`${sandPosition[0]},${sandPosition[1]}`] = "o";
    sandPosition = [500, 0];
    sandUnit += 1;
  }

  // console.log(getMap(world));

  return sandUnit;
};
