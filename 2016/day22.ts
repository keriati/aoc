import { mk2n } from "../util/utils";
import { BucketQueue } from "../util/bucketqueue";

class Node {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly size: number,
    public readonly used: number,
    public readonly avail: number
  ) {}
}

const parseInput = (input) =>
  input.split("\n").map((l) => {
    const [, x, y, size, used, avail] = l.match(
      /\/dev\/grid\/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+\d+%/
    );

    return new Node(
      Number(x),
      Number(y),
      Number(size),
      Number(used),
      Number(avail)
    );
  });

export const getViablePairs = (input: string) => {
  const nodes: Node[] = parseInput(input);

  let pairs = 0;

  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];

      if (a.used > 0 && a.used <= b.avail) pairs++;
      if (b.used > 0 && b.used <= a.avail) pairs++;
    }
  }

  return pairs;
};

const getStepsToBeforeLast = (nodeMap: Node[][], node: Node) => {
  const endX = nodeMap[0].length - 2;
  const endY = 0;

  const queue = new BucketQueue<[number, number, number]>();

  queue.push([node.x, node.y, 0], 0);
  const visited = new Set<number>();

  while (queue.size > 0) {
    const [x, y, steps] = queue.popMin();

    if (x === endX && y === endY) return steps;

    const neighbours = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];

    neighbours.forEach(([nx, ny]) => {
      if (nx < 0 || ny < 0 || nx >= nodeMap[0].length || ny >= nodeMap.length)
        return;

      const n = nodeMap[ny][nx];

      if (n.used > node.avail) return;
      if (visited.has(mk2n(nx, ny))) return;

      visited.add(mk2n(nx, ny));
      queue.push([nx, ny, steps + 1], steps + 1);
    });
  }

  return -1;
};

export const getFewestStepsForData = (input: string) => {
  const nodes: Node[] = parseInput(input);

  const nodeMap: Node[][] = [];

  nodes.forEach((n) => {
    const { x, y } = n;
    nodeMap[y] = nodeMap[y] || [];
    nodeMap[y][x] = n;
  });

  const spaceNeeded = nodeMap[0][nodeMap[0].length - 1].used;

  const startNode = nodes.filter((n) => n.avail > spaceNeeded);

  const stepsToBeforeLast = getStepsToBeforeLast(nodeMap, startNode[0]);

  return stepsToBeforeLast + (nodeMap[0].length - 2) * 5 + 1;
};
