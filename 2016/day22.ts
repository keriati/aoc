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

export const getViablePairs = (input) => {
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
