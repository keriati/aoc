const getPermutations = (items: string[]): string[][] => {
  if (items.length === 0) return [[]];

  const first = items[0];

  const allPermutations = [];

  for (const perm of getPermutations(items.slice(1))) {
    for (let i = 0; i <= perm.length; i++) {
      allPermutations.push([...perm.slice(0, i), first, ...perm.slice(i)]);
    }
  }

  return allPermutations;
};

export const getResult = (input): [number, number] => {
  const lines = input.split("\n");
  const paths = new Map<string, number>();
  const places = new Set<string>();

  for (const line of lines) {
    const [, p1, p2, dst] = line.match(/(\w+) to (\w+) = (\d+)/);
    const distance = parseInt(dst, 10);
    places.add(p1);
    places.add(p2);
    paths.set(`${p1}-${p2}`, distance);
    paths.set(`${p2}-${p1}`, distance);
  }

  const allPaths = getPermutations(Array.from(places));

  const pathLengths = allPaths.map((path) =>
    path.reduce((sum, p, i) => {
      if (!path[i + 1]) return sum;
      return sum + paths.get(`${p}-${path[i + 1]}`);
    }, 0)
  );

  pathLengths.sort((a, b) => a - b);

  // [shortest, longest]
  return [pathLengths[0], pathLengths[pathLengths.length - 1]];
};
