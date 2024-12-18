import { mk2n } from "../util/utils";

const getAreaPoints = (map: string[], x: number, y: number, plant: string) => {
  const areaPoints = new Set<string>();
  areaPoints.add(`${x},${y}`);
  const queue = [[x, y]];

  while (queue.length) {
    const [x, y] = queue.shift();

    const neighbors = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];

    for (const [nx, ny] of neighbors) {
      if (nx < 0 || ny < 0 || nx >= map[0].length || ny >= map.length) {
        continue;
      }

      if (map[ny][nx] === plant && !areaPoints.has(`${nx},${ny}`)) {
        areaPoints.add(`${nx},${ny}`);
        queue.push([nx, ny]);
      }
    }
  }

  return areaPoints;
};

const getPerimeter = (areaPoints: Set<string>): number => {
  let perimeter = 0;
  const visited = new Set<string>();

  for (const point of areaPoints) {
    const [x, y] = point.split(",").map(Number);

    const neighbors = [
      [x + 1, y, "u"],
      [x - 1, y, "d"],
      [x, y + 1, "r"],
      [x, y - 1, "l"],
    ];

    for (const [nx, ny, d] of neighbors) {
      if (visited.has(`${nx},${ny},${d}`)) {
        continue;
      }
      visited.add(`${nx},${ny},${d}`);

      if (!areaPoints.has(`${nx},${ny}`)) {
        perimeter++;
      }
    }
  }

  return perimeter;
};

export const getFencingPrice = (input: string) => {
  const map = input.split("\n");

  const visited = new Set<string>();

  let result = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (visited.has(`${x},${y}`)) {
        continue;
      }

      const plant = map[y][x];

      const areaPoints = getAreaPoints(map, x, y, plant);
      areaPoints.forEach((point) => visited.add(point));

      const area = areaPoints.size;

      const perimeter = getPerimeter(areaPoints);

      result += area * perimeter;
    }
  }

  return result;
};

const getCorners = (areaPoints: Set<string>, map: string[]) => {
  let count = 0;
  const area = [...areaPoints];

  const xlen = map[0].length - 1;
  const ylen = map.length - 1;

  for (let i = 0; i < area.length; i++) {
    const [x, y] = area[i].split(",").map(Number);

    const gardenType = map[y][x];

    if (x === 0 && y === 0) {
      count += 1;
    }

    if (x === 0 && y === xlen) {
      count += 1;
    }

    if (x === xlen && y === ylen) {
      count += 1;
    }

    if (x === xlen && y === 0) {
      count += 1;
    }

    // top left outside corner
    // ##   __   |#
    // #O   #O   |O
    if (
      (x > 0 &&
        y > 0 &&
        map[y][x - 1] !== gardenType &&
        map[y - 1][x] !== gardenType) ||
      (x > 0 && y === 0 && map[y][x - 1] !== gardenType) ||
      (x === 0 && y > 0 && map[y - 1][x] !== gardenType)
    ) {
      count += 1;
    }

    // top left inside corner
    // OO
    // O#
    if (
      x < xlen &&
      y < ylen &&
      map[y][x + 1] === gardenType &&
      map[y + 1][x] === gardenType &&
      map[y + 1][x + 1] !== gardenType
    ) {
      count += 1;
    }

    // top right outside corner
    // ##   __    #|
    // O#   O#    O|
    if (
      (x < xlen &&
        y > 0 &&
        map[y][x + 1] !== gardenType &&
        map[y - 1][x] !== gardenType) ||
      (x < xlen && y === 0 && map[y][x + 1] !== gardenType) ||
      (x === xlen && y > 0 && map[y - 1][x] !== gardenType)
    ) {
      count += 1;
    }

    // top right inside corner
    // OO
    // #O
    if (
      x > 0 &&
      y < ylen &&
      map[y][x - 1] === gardenType &&
      map[y + 1][x] === gardenType &&
      map[y + 1][x - 1] !== gardenType
    ) {
      count += 1;
    }

    // bottom left outside corner
    // #O   #O    |O
    // ##   --    |#
    if (
      (x > 0 &&
        y < ylen &&
        map[y][x - 1] !== gardenType &&
        map[y + 1][x] !== gardenType) ||
      (x > 0 && y === ylen && map[y][x - 1] !== gardenType) ||
      (x === 0 && y < ylen && map[y + 1][x] !== gardenType)
    ) {
      count += 1;
    }

    // bottom left inside corner
    // O#
    // OO
    if (
      x < xlen &&
      y > 0 &&
      map[y][x + 1] === gardenType &&
      map[y - 1][x] === gardenType &&
      map[y - 1][x + 1] !== gardenType
    ) {
      count += 1;
    }

    // bottom right outside corner
    // O#   O#    O|
    // ##   --    #|
    if (
      (x < xlen &&
        y < ylen &&
        map[y][x + 1] !== gardenType &&
        map[y + 1][x] !== gardenType) ||
      (x < xlen && y === ylen && map[y][x + 1] !== gardenType) ||
      (x === xlen && y < ylen && map[y + 1][x] !== gardenType)
    ) {
      count += 1;
    }

    // bottom right inside corner
    // #O
    // OO
    if (
      x > 0 &&
      y > 0 &&
      map[y][x - 1] === gardenType &&
      map[y - 1][x] === gardenType &&
      map[y - 1][x - 1] !== gardenType
    ) {
      count += 1;
    }
  }

  return count;
};

export const getFencingPriceNew = (input: string) => {
  const map = input.split("\n");

  const visited = new Set<number>();

  let result = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (visited.has(mk2n(x, y))) {
        continue;
      }

      const plant = map[y][x];

      const areaPoints = getAreaPoints(map, x, y, plant);
      areaPoints.forEach((point) => {
        const [x, y] = point.split(",").map(Number);
        visited.add(mk2n(x, y));
      });

      const area = areaPoints.size;

      const fenceSides = getCorners(areaPoints, map);

      result += area * fenceSides;
    }
  }

  return result;
};
