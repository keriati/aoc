/* eslint-disable class-methods-use-this,no-restricted-syntax */
class HeapArray {
  items: [number, number, number][] = [];

  push(item: [number, number, number]) {
    this.items.push(item);
    this.items.sort((a, b) => b[2] - a[2]);
  }

  pop() {
    return this.items.pop();
  }

  size() {
    return this.items.length;
  }
}

const neighbours = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

class CaveMap {
  cave: number[][] = [];

  constructor(input) {
    input.split("\n").forEach((row, y) => {
      this.cave.push([]);
      row.split("").forEach((pos, x) => {
        this.cave[y][x] = Number.parseInt(pos, 10);
      });
    });
  }

  getLowestRiskPathSum() {
    const costMap = new Map<string, number>();
    const myHeap = this.getHeap();
    const visited = new Set<string>();

    myHeap.push([0, 0, 0]);

    while (myHeap.size() > 0) {
      const [x, y, risk] = myHeap.pop();

      const pos = `${x},${y}`;

      if (visited.has(pos)) continue;
      visited.add(pos);

      costMap.set(pos, risk);

      if (y === this.cave.length - 1 && x === this.cave[0].length - 1) {
        break;
      }

      for (const [dx, dy] of neighbours) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx < 0 ||
          nx >= this.cave.length ||
          ny < 0 ||
          ny >= this.cave.length
        )
          continue;

        myHeap.push([nx, ny, this.cave[ny][nx] + risk]);
      }
    }

    return costMap.get(`${this.cave.length - 1},${this.cave.length - 1}`);
  }

  private getHeap() {
    return new HeapArray();
  }
}

export const getResult = (input) => {
  const myMap = new CaveMap(input);

  return myMap.getLowestRiskPathSum();
};
