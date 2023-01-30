const getParentMap = (lines: string[]): Record<string, string[]> =>
  lines.reduce((res, l) => {
    const [child, parents] = l.split(" bags contain ");

    for (const parent of parents.split(", ")) {
      if (parent === "no other bags.") continue;

      const parentName = parent.match(/(\d+) ([a-z ]+) bag/)[2];

      if (!(parentName in res)) res[parentName] = [];

      res[parentName].push(child);
    }

    return res;
  }, {});

const getParentCount = (
  bag: string,
  map: Record<string, string[]>,
  visited: string[] = []
): number => {
  if (visited.indexOf(bag) !== -1) return 0;

  visited.push(bag);

  let allBags = 1;

  map[bag]?.forEach((p) => {
    allBags += getParentCount(p, map, visited);
  });

  return allBags;
};

export const getParents = (input) => {
  const lines = input.split("\n");
  const map = getParentMap(lines);
  const parents = getParentCount("shiny gold", map);
  return parents - 1;
};

const getChildrenMap = (lines: string[]): Record<string, [string, number][]> =>
  lines.reduce((res, l) => {
    const [parent, children] = l.split(" bags contain ");

    for (const child of children.split(", ")) {
      if (child === "no other bags.") continue;

      const [, amountS, childName] = child.match(/(\d+) ([a-z ]+) bag/);
      const amount = parseInt(amountS, 10);

      if (!(parent in res)) res[parent] = [];

      res[parent].push([childName, amount]);
    }

    return res;
  }, {});

const getChildrenCount = (
  bag: string,
  map: Record<string, [string, number][]>
): number => {
  if (!(bag in map)) return 1;

  let allBags = 1;

  map[bag].forEach(([child, amount]) => {
    allBags += amount * getChildrenCount(child, map);
  });

  return allBags;
};

export const getChildren = (input) => {
  const lines = input.split("\n");
  const map = getChildrenMap(lines);
  const children = getChildrenCount("shiny gold", map);
  return children - 1;
};
