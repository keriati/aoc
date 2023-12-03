import { defaultDict } from "../util/utils";

const hasSymbol = (
  engineSchematic: string[][],
  line: number,
  start: number,
  end: number
) => {
  for (let y = line - 1; y <= line + 1; y++) {
    if (!engineSchematic[y]) continue;

    for (let x = start - 1; x <= end + 1; x++) {
      if (
        x >= 0 &&
        x <= engineSchematic[y].length - 1 &&
        engineSchematic[y][x] !== "." &&
        !/\d/.test(engineSchematic[y][x])
      ) {
        return true;
      }
    }
  }

  return false;
};

export const getPartNumberSum = (input: string) => {
  const engineSchematic = input.split("\n").map((line) => line.split(""));

  let sum = 0;

  let num = "";
  let start = null;
  let end = null;

  for (let y = 0; y < engineSchematic.length; y++) {
    for (let x = 0; x <= engineSchematic[y].length; x++) {
      if (/\d/.test(engineSchematic[y][x])) {
        if (start === null) {
          start = x;
        }

        num = `${num}${engineSchematic[y][x]}`;
      } else if (start !== null) {
        end = x - 1;

        if (hasSymbol(engineSchematic, y, start, end)) {
          sum += Number(num);
        }

        end = null;
        start = null;
        num = "";
      }
    }
  }

  return sum;
};

const getGear = (
  engineSchematic: string[][],
  line: number,
  start: number,
  end: number
): string | null => {
  for (let y = line - 1; y <= line + 1; y++) {
    if (!engineSchematic[y]) continue;

    for (let x = start - 1; x <= end + 1; x++) {
      if (
        x >= 0 &&
        x <= engineSchematic[y].length - 1 &&
        engineSchematic[y][x] === "*"
      ) {
        return `${x},${y}`;
      }
    }
  }

  return null;
};

export const getGearRatioSum = (input: string) => {
  const engineSchematic = input.split("\n").map((line) => line.split(""));

  let sum = 0;
  let num = "";
  let start = null;
  let end = null;

  const gears = defaultDict(Array);

  for (let y = 0; y < engineSchematic.length; y++) {
    for (let x = 0; x <= engineSchematic[y].length; x++) {
      if (/\d/.test(engineSchematic[y][x])) {
        if (start === null) {
          start = x;
        }

        num = `${num || ""}${engineSchematic[y][x]}`;
      } else if (start !== null) {
        end = x - 1;
        const gear = getGear(engineSchematic, y, start, end);

        if (gear !== null) {
          gears[gear].push(Number(num));
        }

        end = null;
        start = null;
        num = "";
      }
    }
  }

  for (const gear in gears) {
    if (gears[gear].length === 2) {
      sum += gears[gear][0] * gears[gear][1];
    }
  }

  return sum;
};
