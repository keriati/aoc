class Consortium {
  octopuses: number[][] = [];

  constructor(input: string) {
    input.split("\n").forEach((row, y) => {
      this.octopuses[y] = [];
      row.split("").forEach((octopus, x) => {
        this.octopuses[y][x] = Number.parseInt(octopus, 10);
      });
    });
  }

  increaseLevel() {
    this.octopuses = this.octopuses.map((row) =>
      row.map((octopus) => octopus + 1)
    );
  }

  step() {
    const visited = new Set<string>();

    this.increaseLevel();

    this.octopuses.forEach((row, y) => {
      row.forEach((octopus, x) => {
        this.flash([x, y], visited);
      });
    });

    let flashes = 0;

    this.octopuses.forEach((row, y) => {
      row.forEach((octopus, x) => {
        if (octopus > 9) {
          flashes += 1;
          this.octopuses[y][x] = 0;
        }
      });
    });

    return flashes;
  }

  private flash(position: [number, number], visited: Set<string>) {
    if (this.octopuses[position[1]][position[0]] <= 9) {
      return;
    }

    if (visited.has(position.toString())) {
      return;
    }

    visited.add(position.toString());

    const neighbours = this.getNeighbours(position);

    neighbours.forEach(([x, y]) => {
      this.octopuses[y][x] += 1;
    });

    neighbours.forEach((pos) => this.flash(pos, visited));
  }

  private getNeighbours([x, y]: [number, number]): [number, number][] {
    const candidates: [number, number][] = [
      [x + 1, y],
      [x + 1, y + 1],
      [x, y + 1],
      [x - 1, y + 1],
      [x - 1, y],
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
    ];

    return candidates.filter(
      ([x, y]) => this.octopuses[y] && typeof this.octopuses[y][x] === "number"
    );
  }
}

export const getResult = (input, steps) => {
  const myConsortium = new Consortium(input);

  let flashes = 0;

  for (let i = 0; i < steps; i += 1) {
    flashes += myConsortium.step();
  }

  return flashes;
};

export const getResultPart2 = (input) => {
  const myConsortium = new Consortium(input);
  const consortiumSize =
    myConsortium.octopuses.length * myConsortium.octopuses[0].length;
  let flashes = 0;
  let steps = 0;

  do {
    flashes = myConsortium.step();
    steps += 1;
  } while (flashes !== consortiumSize);

  return steps;
};
