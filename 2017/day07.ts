/* eslint-disable default-case */
export const getResult = (input: string): string => {
  const parentNodes = new Set<string>();
  const childrenNodes = new Set<string>();

  input.split("\n").forEach((l) => {
    const node: string = l.split(" (")[0];
    const children: string[] =
      l.indexOf(" -> ") > -1 ? l.split(" -> ")[1].split(", ") : [];

    parentNodes.add(node);
    children.forEach((n) => childrenNodes.add(n));
  });

  for (const node of parentNodes) {
    if (!childrenNodes.has(node)) return node;
  }
  throw new Error("Not found");
};

const getUnbalanced = (children: Continue[]) => {
  const weightValues: Map<number, number> = children.reduce((values, child) => {
    if (!values.has(child.value[1])) values.set(child.value[1], 0);
    values.set(child.value[1], values.get(child.value[1]) + 1);

    return values;
  }, new Map<number, number>());

  const outlier = Array.from(weightValues).find(([, count]) => count === 1);
  const balanced = Array.from(weightValues).find(([, count]) => count !== 1);

  return { outlier, balanced };
};

type Continue = { tag: "continue"; value: [string, number] };
type Finish = { tag: "finish"; value: number };

type OutlierResult = Continue | Finish;

const findUnbalanced = (
  nodes: Map<string, [number, string[]]>,
  position: string
): OutlierResult => {
  const current = nodes.get(position);

  if (current[1].length === 0) {
    return { tag: "continue", value: [position, current[0]] };
  }

  const disks: Continue[] = [];

  for (const child of current[1]) {
    const disk = findUnbalanced(nodes, child);

    switch (disk.tag) {
      case "continue":
        disks.push(disk);
        break;
      case "finish":
        return disk;
    }
  }

  if (disks.length > 2) {
    const { outlier, balanced } = getUnbalanced(disks);

    if (typeof outlier !== "undefined") {
      const weightDifference = outlier[0] - balanced[0];

      const outlierNode = nodes.get(
        disks.find(({ value: [, v] }) => v === outlier[0]).value[0]
      );

      return { tag: "finish", value: outlierNode[0] - weightDifference };
    }
  }

  return {
    tag: "continue",
    value: [
      position,
      current[0] + disks.reduce((s, { value: [, n] }) => s + n, 0),
    ],
  };
};

export const getResult2 = (input: string, root) => {
  const nodes = input.split("\n").reduce((nodes, l) => {
    const node: string = l.split(" (")[0];
    const weight = Number(l.split(" (")[1].split(")")[0]);
    const children: string[] =
      l.indexOf(" -> ") > -1 ? l.split(" -> ")[1].split(", ") : [];

    nodes.set(node, [weight, children]);

    return nodes;
  }, new Map<string, [number, string[]]>());

  return findUnbalanced(nodes, root).value;
};
