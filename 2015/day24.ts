const weight = (g: number[]) => g.reduce((a, b) => a + b, 0);

const quantumEntanglement = (g: number[]) => g.reduce((a, b) => a * b, 1);

export const getBestQuantumEntanglement = (input: string, groups = 3) => {
  const packages = input.split("\n").map(Number);

  const groupWeight = packages.reduce((a, b) => a + b, 0) / groups;

  const groupingOptions = [];
  let smallestGroupSize = Number.MAX_SAFE_INTEGER;

  const queue: [number[], number][] = [[[], 0]];

  while (queue.length > 0) {
    const [g1, i] = queue.pop();

    if (weight(g1) === groupWeight) {
      groupingOptions.push(g1);
      smallestGroupSize = Math.min(smallestGroupSize, g1.length);
      continue;
    }
    if (weight(g1) > groupWeight) continue;
    if (g1.length > smallestGroupSize) continue;

    for (let j = i; j < packages.length; j++) {
      queue.push([[...g1, packages[j]], j + 1]);
    }
  }

  const quantumEntanglements = groupingOptions
    .filter((g) => g.length === smallestGroupSize)
    .map((g) => quantumEntanglement(g));

  quantumEntanglements.sort((a, b) => a - b);

  return quantumEntanglements[0];
};
