const getOrbits = (
  orbitMap: Record<string, string[]>,
  node: string,
  depth = 0
) => {
  if (!(node in orbitMap)) return depth;

  let orbits = 0;

  orbitMap[node].forEach((child) => {
    orbits += getOrbits(orbitMap, child, depth + 1);
  });

  return orbits + depth;
};

export const getAllOrbits = (input) =>
  getOrbits(
    input.split("\n").reduce((orbitMap, l) => {
      const [p, c] = l.split(")");
      if (!(p in orbitMap)) orbitMap[p] = [];
      orbitMap[p].push(c);
      return orbitMap;
    }, {}),
    "COM"
  );

const getPath = (
  orbitMap: Record<string, string[]>,
  start: string,
  target: string
) => {
  const neighbors: [string, number][] = orbitMap[start].map((n) => [n, 0]);
  const visited = new Set<string>([start]);

  while (neighbors.length > 0) {
    const [current, dist] = neighbors.shift();

    visited.add(current);

    const currentNeighbors = orbitMap[current];

    if (currentNeighbors.includes(target)) {
      return dist;
    }

    currentNeighbors.forEach((n) => {
      if (!visited.has(n)) {
        neighbors.push([n, dist + 1]);
      }
    });
  }

  return 0;
};

export const getShortestPathToSAN = (input) =>
  getPath(
    input.split("\n").reduce((orbitMap, l) => {
      const [p, c] = l.split(")");

      if (!(p in orbitMap)) orbitMap[p] = [];
      orbitMap[p].push(c);

      if (!(c in orbitMap)) orbitMap[c] = [];
      orbitMap[c].push(p);

      return orbitMap;
    }, {}),
    "YOU",
    "SAN"
  );
