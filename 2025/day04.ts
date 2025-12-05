import { get8Neighbors } from "../util/utils";

export const getResult = (input: string) => {
  const paperMap = input.split("\n").map((line) => line.split(""));
  let result = 0;

  for (let y = 0; y < paperMap.length; y++) {
    for (let x = 0; x < paperMap[y].length; x++) {
      if (paperMap[y][x] === "@") {
        let adjacentCount = 0;

        for (const [nx, ny] of get8Neighbors(paperMap, x, y)) {
          if (paperMap[ny][nx] === "@") {
            adjacentCount++;
          }
        }

        if (adjacentCount < 4) {
          result++;
        }
      }
    }
  }

  return result;
};

export const getResultPart2 = (input: string) => {
  const paperMap = input.split("\n").map((line) => line.split(""));
  let total = 0;

  while (true) {
    let result = 0;
    let removed = [];

    for (let y = 0; y < paperMap.length; y++) {
      for (let x = 0; x < paperMap[y].length; x++) {
        if (paperMap[y][x] === "@") {
          let adjacentCount = 0;

          for (const [nx, ny] of get8Neighbors(paperMap, x, y)) {
            if (paperMap[ny][nx] === "@") {
              adjacentCount++;
            }
          }

          if (adjacentCount < 4) {
            result++;
            removed.push([y, x]);
          }
        }
      }
    }

    for (const [y, x] of removed) {
      paperMap[y][x] = "x";
    }

    total += result;

    if (result === 0) {
      break;
    }
  }

  return total;
};
