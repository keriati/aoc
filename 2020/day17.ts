class Grid {
  public state = new Map<string, boolean>();

  constructor(input: string) {
    input.split("\n").forEach((l, y) => {
      l.split("").forEach((p, x) => {
        this.state.set(Grid.str(x, y, 0), p === "#");
      });
    });
  }

  static str(x, y, z) {
    return `${x},${y},${z}`;
  }

  static prs(p: string): [number, number, number] {
    return p.split(",").map((n) => parseInt(n, 10)) as [number, number, number];
  }

  expand() {
    const newState = new Map<string, boolean>();

    this.state.forEach((active, position) => {
      const [x, y, z] = Grid.prs(position);

      for (let ix = x - 1; ix <= x + 1; ix++) {
        for (let iy = y - 1; iy <= y + 1; iy++) {
          for (let iz = z - 1; iz <= z + 1; iz++) {
            if (ix === x && iy === y && iz === z) continue;

            const key = Grid.str(ix, iy, iz);

            if (!this.state.has(key)) {
              newState.set(key, false);
            } else {
              newState.set(position, active);
            }
          }
        }
      }
    });

    this.state = newState;
  }

  cycle() {
    this.expand();

    const newState = new Map<string, boolean>();

    this.state.forEach((active, position) => {
      const [x, y, z] = Grid.prs(position);
      let activeNeighbours = 0;

      for (let ix = x - 1; ix <= x + 1; ix++) {
        for (let iy = y - 1; iy <= y + 1; iy++) {
          for (let iz = z - 1; iz <= z + 1; iz++) {
            if (ix === x && iy === y && iz === z) continue;

            const key = Grid.str(ix, iy, iz);

            if (this.state.has(key)) {
              if (this.state.get(key)) {
                activeNeighbours++;
              }
            }
          }
        }
      }

      if (active) {
        if (activeNeighbours === 2 || activeNeighbours === 3) {
          newState.set(position, true);
        } else {
          newState.set(position, false);
        }
      } else if (activeNeighbours === 3) {
        newState.set(position, true);
      } else {
        newState.set(position, false);
      }
    });

    this.state = newState;
  }
}

export const getActiveCubes = (input, cycles = 6) => {
  const myGrid = new Grid(input);

  for (let i = 0; i < cycles; i++) {
    myGrid.cycle();
  }

  return Array.from(myGrid.state.values()).reduce(
    (sum, n) => (n ? sum + 1 : sum),
    0
  );
};

class Grid4d {
  public state = new Map<string, boolean>();

  constructor(input: string) {
    input.split("\n").forEach((l, y) => {
      l.split("").forEach((p, x) => {
        this.state.set(Grid4d.str(x, y, 0, 0), p === "#");
      });
    });
  }

  static str(x, y, z, w) {
    return `${x},${y},${z},${w}`;
  }

  static prs(p: string): [number, number, number, number] {
    return p.split(",").map((n) => parseInt(n, 10)) as [
      number,
      number,
      number,
      number
    ];
  }

  expand() {
    const newState = new Map<string, boolean>();

    this.state.forEach((active, position) => {
      const [x, y, z, w] = Grid4d.prs(position);

      for (let ix = x - 1; ix <= x + 1; ix++) {
        for (let iy = y - 1; iy <= y + 1; iy++) {
          for (let iz = z - 1; iz <= z + 1; iz++) {
            for (let iw = w - 1; iw <= w + 1; iw++) {
              if (ix === x && iy === y && iz === z && iw === w) continue;

              const key = Grid4d.str(ix, iy, iz, iw);

              if (!this.state.has(key)) {
                newState.set(key, false);
              } else {
                newState.set(position, active);
              }
            }
          }
        }
      }
    });

    this.state = newState;
  }

  cycle() {
    this.expand();

    const newState = new Map<string, boolean>();

    this.state.forEach((active, position) => {
      const [x, y, z, w] = Grid4d.prs(position);
      let activeNeighbours = 0;

      for (let ix = x - 1; ix <= x + 1; ix++) {
        for (let iy = y - 1; iy <= y + 1; iy++) {
          for (let iz = z - 1; iz <= z + 1; iz++) {
            for (let iw = w - 1; iw <= w + 1; iw++) {
              if (ix === x && iy === y && iz === z && iw === w) continue;

              const key = Grid4d.str(ix, iy, iz, iw);

              if (this.state.has(key)) {
                if (this.state.get(key)) {
                  activeNeighbours++;
                }
              }
            }
          }
        }
      }

      if (active) {
        if (activeNeighbours === 2 || activeNeighbours === 3) {
          newState.set(position, true);
        } else {
          newState.set(position, false);
        }
      } else if (activeNeighbours === 3) {
        newState.set(position, true);
      } else {
        newState.set(position, false);
      }
    });

    this.state = newState;
  }
}

export const getActiveCubes4d = (input, cycles = 6) => {
  const myGrid = new Grid4d(input);

  for (let i = 0; i < cycles; i++) {
    myGrid.cycle();
  }

  return Array.from(myGrid.state.values()).reduce(
    (sum, n) => (n ? sum + 1 : sum),
    0
  );
};
