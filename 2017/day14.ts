import { getKnotHash } from "./day10";
import { hexToBin } from "../util/utils";

export const getSquareCount = (input) => {
  let squares = 0;

  for (let i = 0; i < 128; i++) {
    const knotHash = getKnotHash(`${input}-${i}`);
    const binaryHash = hexToBin(knotHash);
    for (let j = 0; j < binaryHash.length; j++) {
      if (binaryHash[j] === "1") {
        squares++;
      }
    }
  }

  return squares;
};

const hashPos = (a, b) => a * 1000 + b;

export const getRegionCount = (input) => {
  const hashes = [];
  let regions = 0;
  const visited = new Set<number>();

  for (let i = 0; i < 128; i++) {
    const knotHash = getKnotHash(`${input}-${i}`);
    hashes.push(hexToBin(knotHash).split(""));
  }

  for (let y = 0; y < hashes.length; y++) {
    for (let x = 0; x < hashes[y].length; x++) {
      const posHash = hashPos(x, y);
      if (hashes[y][x] === "1" && !visited.has(posHash)) {
        regions++;
        const exploreQ = [[x, y]];

        while (exploreQ.length > 0) {
          const [x, y] = exploreQ.pop();

          const posHash = hashPos(x, y);
          if (visited.has(posHash)) continue;
          visited.add(posHash);

          if (hashes[y]?.[x + 1] === "1") exploreQ.push([x + 1, y]);
          if (hashes[y]?.[x - 1] === "1") exploreQ.push([x - 1, y]);
          if (hashes[y + 1]?.[x] === "1") exploreQ.push([x, y + 1]);
          if (hashes[y - 1]?.[x] === "1") exploreQ.push([x, y - 1]);
        }
      }
    }
  }

  return regions;
};
