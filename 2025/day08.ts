import { ed3d } from "../util/utils";

const getDistances = (
  nodes: [number, number, number][]
): Map<number, [string, string]> => {
  const distances: Map<number, [string, string]> = new Map();

  for (let i = 0; i < nodes.length - 1; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const n1 = nodes[i];
      const n2 = nodes[j];

      const distance = ed3d(n1, n2);
      distances.set(distance, [`${n1}`, `${n2}`]);
    }
  }

  return distances;
};

const mergeCircuits = (sets: Set<string>[]): Set<string>[] => {
  for (const set of sets) {
    for (const otherSet of sets) {
      if (set === otherSet) continue;

      for (const item of set) {
        if (otherSet.has(item)) {
          for (const otherItem of otherSet) {
            set.add(otherItem);
          }
          sets = sets.filter((s) => s !== otherSet);
          return mergeCircuits(sets);
        }
      }
    }
  }

  return sets;
};

const getSizes = (islands: Set<string>[]) => {
  const sizes = [];

  for (const island of islands) {
    sizes.push(island.size);
  }

  sizes.sort((a, b) => b - a);

  return sizes;
};

export const getResult = (input: string, maxCon = 1000) => {
  const lines: [number, number, number][] = input
    .split("\n")
    .map((line) => line.split(",").map(Number)) as [number, number, number][];

  const distanceMap: Map<number, [string, string]> = getDistances(lines);
  let circuits: Set<string>[] = [];

  const distances = Array.from(distanceMap.keys());
  distances.sort((a, b) => a - b);

  for (let i = 0; i < maxCon; i++) {
    let minDistance = distances[i];

    const [from, to] = distanceMap.get(minDistance)!;

    circuits.push(new Set<string>([from, to]));

    circuits = mergeCircuits(circuits);
  }

  const sizes = getSizes(circuits);

  return sizes[0] * sizes[1] * sizes[2];
};

export const getResultPart2 = (input: string) => {
  const lines: [number, number, number][] = input
    .split("\n")
    .map((line) => line.split(",").map(Number)) as [number, number, number][];

  const distanceMap: Map<number, [string, string]> = getDistances(lines);
  let circuits: Set<string>[] = [];

  const distances = Array.from(distanceMap.keys());
  distances.sort((a, b) => a - b);

  for (let i = 0; i < distances.length; i++) {
    let minDistance = distances[i];

    const [from, to] = distanceMap.get(minDistance)!;

    circuits.push(new Set<string>([from, to]));

    circuits = mergeCircuits(circuits);

    if (circuits.length === 1) {
      if (circuits[0].size === lines.length) {
        let fromX = +from.split(",")[0];
        let toX = +to.split(",")[0];
        return fromX * toX;
      }
    }
  }
};
