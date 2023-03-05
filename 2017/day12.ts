const parseNodes = (input) => {
  const nodes = new Map<number, number[]>();

  input.split("\n").forEach((line) => {
    const [parentS, childS] = line.split(" <-> ");
    const parent = Number(parentS);
    const children = childS.split(", ").map((s) => Number(s));

    nodes.set(parent, children);
  });

  return nodes;
};

export const getConnected = (input) => {
  const nodes = parseNodes(input);

  let count = 0;
  const q = [];
  const visited = new Set<number>();
  q.push(0);

  while (q.length > 0) {
    const nodeKey = q.pop();

    const children = nodes.get(nodeKey);

    for (const child of children) {
      if (!visited.has(child)) {
        count++;
        q.push(child);
        visited.add(child);
      }
    }
  }

  return count;
};

const explore = (
  nodes: Map<number, number[]>,
  current: number,
  visited: Set<number>
) => {
  if (visited.has(current)) return false;

  visited.add(current);

  for (const neighbor of nodes.get(current)) {
    explore(nodes, neighbor, visited);
  }

  return true;
};

export const getGroups = (input) => {
  const nodes: Map<number, number[]> = parseNodes(input);
  const visited = new Set<number>();
  let count = 0;

  for (const [node] of nodes) {
    if (explore(nodes, node, visited) === true) {
      count += 1;
    }
  }

  return count;
};
