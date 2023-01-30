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
) => {
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
