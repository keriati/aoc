class CaveMap {
  graph: Map<string, string[]> = new Map();

  constructor(input) {
    input.split("\n").forEach((connection) => {
      const [a, b] = connection.split("-");
      if (!this.graph.has(a)) this.graph.set(a, []);
      if (!this.graph.has(b)) this.graph.set(b, []);
      this.graph.set(a, [...this.graph.get(a), b]);
      this.graph.set(b, [...this.graph.get(b), a]);
    });
  }

  getSmallCaves() {
    return Array.from(this.graph.keys()).filter(
      (cave) =>
        cave.toLowerCase() === cave && cave !== "start" && cave !== "end"
    );
  }

  getPaths(
    source = "start",
    destination = "end",
    visited = [],
    canVisitTwice = null
  ) {
    if (source === destination) {
      return 1;
    }

    if (visited.includes(source)) {
      if (source === canVisitTwice) {
        canVisitTwice = null;
      } else {
        return 0;
      }
    }

    const newVisited =
      source.toLowerCase() === source ? [...visited, source] : visited;

    let paths = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const neighbour of this.graph.get(source)) {
      paths += this.getPaths(neighbour, destination, newVisited, canVisitTwice);
    }

    return paths;
  }
}

export const getResult = (input) => {
  const myMap = new CaveMap(input);

  return myMap.getPaths();
};

export const getResultPart2 = (input) => {
  const myMap = new CaveMap(input);

  const smallCaves = myMap.getSmallCaves();

  const basePaths = myMap.getPaths();

  let paths = 0;

  smallCaves.forEach((cave) => {
    paths += myMap.getPaths("start", "end", [], cave);
  });

  return paths - basePaths * (smallCaves.length - 1);
};
