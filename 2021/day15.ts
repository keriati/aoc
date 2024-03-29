import { MinBucketQueue } from "bucket-priority-queue";
import { mk2n } from "../util/utils";

const neighbours = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

export class CaveMap {
  cave: number[][] = [];

  private increased = 1;

  constructor(input) {
    input.split("\n").forEach((row, y) => {
      this.cave.push([]);
      row.split("").forEach((pos, x) => {
        this.cave[y][x] = Number.parseInt(pos, 10);
      });
    });
  }

  increase(times = 5) {
    this.increased = times;
  }

  getSize() {
    return this.cave.length * this.increased;
  }

  getRisk([x, y]): number {
    if (x < this.cave.length && y < this.cave.length) {
      return this.cave[y][x];
    }

    const rounds =
      Math.floor(x / this.cave.length) + Math.floor(y / this.cave.length);

    const originalVal = this.cave[y % this.cave.length][x % this.cave.length];

    return originalVal + rounds <= 9
      ? originalVal + rounds
      : (originalVal + rounds) % (Math.floor((originalVal + rounds) / 9) * 9);
  }

  getLowestRiskPathSum() {
    const costMap = new Map<number, number>();
    const q = new MinBucketQueue<[number, number, number]>();
    const visited = new Set<number>();

    q.push([0, 0, 0], 0);

    while (q.size > 0) {
      const [x, y, risk] = q.pop();

      const pos = mk2n(x, y);

      if (visited.has(pos)) continue;
      visited.add(pos);

      costMap.set(mk2n(x, y), risk);

      if (y === this.getSize() - 1 && x === this.getSize() - 1) {
        break;
      }

      for (const [dx, dy] of neighbours) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= this.getSize() || ny < 0 || ny >= this.getSize())
          continue;

        let newRisk = this.getRisk([nx, ny]) + risk;
        q.push([nx, ny, newRisk], newRisk);
      }
    }

    return costMap.get(mk2n(this.getSize() - 1, this.getSize() - 1));
  }
}

export const getResult = (input) => {
  const myMap = new CaveMap(input);

  return myMap.getLowestRiskPathSum();
};

export const getResultPart2 = (input) => {
  const myMap = new CaveMap(input);

  myMap.increase(5);

  return myMap.getLowestRiskPathSum();
};
