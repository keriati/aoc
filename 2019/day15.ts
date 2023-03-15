import { IntCodeComputer } from "./IntCode09";

const NORTH = 1;
const SOUTH = 2;
const WEST = 3;
const EAST = 4;

const moveDroid = (myDroid: IntCodeComputer, direction: number) => {
  myDroid.addInput(direction);
  myDroid.run();
  return myDroid.getOutput();
};

const display = (positions: number[][], mapped = null) => {
  if (mapped === null) {
    mapped = 0;
    for (let i = 0; i < positions.length; i++) {
      for (let j = 0; j < positions[i].length; j++) {
        if (positions[i][j] !== null) mapped++;
      }
    }
  }

  const screen = [`Mapped: ${mapped}\n`];

  for (let y = 1; y < 45; y++) {
    screen.push("\n");

    for (let x = 1; x < 45; x++) {
      if (x === 22 && y === 22) {
        screen.push("S");
      } else if (typeof positions?.[y]?.[x] === "number") {
        const posVal = positions[y][x];
        if (posVal === 0) screen.push("#");
        if (posVal === 1) screen.push(".");
        if (posVal === 2) screen.push("E");
      } else {
        screen.push(" ");
      }
    }
  }

  console.clear();
  console.log(screen.join(""));
};

const exploreMap = (myDroid: IntCodeComputer) => {
  const positions = new Array(45)
    .fill(null)
    .map(() => new Array(45).fill(null));

  const directions = [NORTH, WEST, SOUTH, EAST];

  const mapSize = 1656;
  let mapped = 0;
  let moves = 0;
  let direction = NORTH;
  let x = 22;
  let y = 22;

  while (mapped < mapSize) {
    const result = moveDroid(myDroid, direction);

    if (result === 1 || result === 2) {
      switch (direction) {
        case NORTH:
          y -= 1;
          break;
        case SOUTH:
          y += 1;
          break;
        case EAST:
          x += 1;
          break;
        case WEST:
          x -= 1;
          break;
      }
      if (positions[y][x] === null) {
        positions[y][x] = result;
      }
    }

    if (result === 0) {
      switch (direction) {
        case NORTH:
          if (positions[y - 1][x] === null) {
            positions[y - 1][x] = result;
          }
          break;
        case SOUTH:
          if (positions[y + 1][x] === null) {
            positions[y + 1][x] = result;
          }
          break;
        case EAST:
          if (positions[y][x + 1] === null) {
            positions[y][x + 1] = result;
          }
          break;
        case WEST:
          if (positions[y][x - 1] === null) {
            positions[y][x - 1] = result;
          }
          break;
      }
    }
    direction = directions[Math.floor(Math.random() * 4)];

    mapped = 0;

    for (let i = 0; i < positions.length; i++) {
      for (let j = 0; j < positions[i].length; j++) {
        if (positions[i][j] !== null) mapped++;
      }
    }

    moves++;
    if (moves % 5000 === 0) {
      display(positions, mapped);
    }
  }

  return positions;
};

const getShortestPath = (positions: number[][]) => {
  const q = [[0, 22, 22]];
  const visited = new Set<number>();

  while (q.length > 0) {
    const [steps, x, y] = q.shift();

    const keyHash = x * 100 + y;
    if (visited.has(keyHash)) continue;
    visited.add(keyHash);

    const value = positions[y][x];
    if (value === 2) {
      console.log("key", y, x);
      return steps;
    }

    if ([1, 2].includes(positions?.[y - 1]?.[x])) q.push([steps + 1, x, y - 1]);
    if ([1, 2].includes(positions?.[y + 1]?.[x])) q.push([steps + 1, x, y + 1]);
    if ([1, 2].includes(positions?.[y]?.[x - 1])) q.push([steps + 1, x - 1, y]);
    if ([1, 2].includes(positions?.[y]?.[x + 1])) q.push([steps + 1, x + 1, y]);
  }

  return 0;
};

const getOxygenGeneratorPosition = (positions: number[][]) => {
  for (let y = 0; y < positions.length; y++) {
    for (let x = 0; x < positions[y].length; x++) {
      if (positions[y][x] === 2) return [x, y];
    }
  }
  return null;
};

const getOxygenFillTime = (positions: number[][]) => {
  const [ox, oy] = getOxygenGeneratorPosition(positions);
  const q = [[0, ox, oy]];
  const visited = new Set<number>();
  let maxSteps = 0;

  while (q.length > 0) {
    const [steps, x, y] = q.shift();

    const keyHash = x * 100 + y;
    if (visited.has(keyHash)) continue;
    visited.add(keyHash);

    if (steps > maxSteps) {
      maxSteps = steps;
    }

    if ([1, 2].includes(positions?.[y - 1]?.[x])) q.push([steps + 1, x, y - 1]);
    if ([1, 2].includes(positions?.[y + 1]?.[x])) q.push([steps + 1, x, y + 1]);
    if ([1, 2].includes(positions?.[y]?.[x - 1])) q.push([steps + 1, x - 1, y]);
    if ([1, 2].includes(positions?.[y]?.[x + 1])) q.push([steps + 1, x + 1, y]);
  }

  return maxSteps;
};

export const getOxygenStats = (input) => {
  const code = input.split(",").map((n) => Number(n));

  const myDroid = new IntCodeComputer(code);

  const positions = exploreMap(myDroid);

  const steps = getShortestPath(positions);

  const oxygenFillTime = getOxygenFillTime(positions);

  display(positions);

  console.log(`Oxygen System Distance: ${steps}`);
  console.log(`Oxygen fill time: ${oxygenFillTime}`);

  return [steps, oxygenFillTime];
};
