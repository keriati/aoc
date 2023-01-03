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

  getPaths(source = "start", destination = "end", visited = []) {
    if (source === destination) {
      return 1;
    }

    if (visited.includes(source)) {
      return 0;
    }

    const newVisited =
      source.toLowerCase() === source ? [...visited, source] : visited;

    let paths = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const neighbour of this.graph.get(source)) {
      paths += this.getPaths(neighbour, destination, newVisited);
    }

    return paths;
  }
}

export const getResult = (input) => {
  const myMap = new CaveMap(input);

  return myMap.getPaths();
};
