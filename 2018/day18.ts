type ForestMap = boolean[][];

const getNeis = (x, y) => [
  [x + 1, y],
  [x + 1, y + 1],
  [x, y + 1],
  [x - 1, y + 1],
  [x - 1, y],
  [x - 1, y - 1],
  [x, y - 1],
  [x + 1, y - 1],
];

class Forest {
  map: ForestMap;

  constructor(input: string = null) {
    if (input) this.map = this.parse(input);
  }

  parse = (input: string) =>
    input.split("\n").map((l) =>
      l.split("").map((c) => {
        if (c === "|") return true;
        if (c === "#") return false;
        return null;
      })
    );

  print() {
    const result = [];

    for (const line of this.map) {
      result.push("\n");
      for (const pos of line) {
        if (pos === null) result.push(".");
        if (pos === true) result.push("|");
        if (pos === false) result.push("#");
      }
    }

    return result.join("");
  }

  copy() {
    const newForest = new Forest();
    newForest.map = this.map.map((a) => a.map((b) => b));

    return newForest;
  }

  getResourceValue() {
    return this.map
      .flat(2)
      .reduce(
        ([trees, yards], pos) => {
          if (pos === true) return [trees + 1, yards];
          if (pos === false) return [trees, yards + 1];
          return [trees, yards];
        },
        [0, 0]
      )
      .reduce((s, n) => s * n, 1);
  }

  update() {
    const newMap = [];

    for (let y = 0; y < this.map.length; y++) {
      newMap[y] = [];

      for (let x = 0; x < this.map[y].length; x++) {
        const pos = this.map[y][x];

        // open acre
        if (pos === null) {
          let trees = 0;
          for (const [nx, ny] of getNeis(x, y)) {
            if (this.map?.[ny]?.[nx] === true) {
              trees++;
            }
          }
          newMap[y][x] = trees >= 3 ? true : null;
        }

        // trees
        if (pos === true) {
          let lYards = 0;
          for (const [nx, ny] of getNeis(x, y)) {
            if (this.map?.[ny]?.[nx] === false) {
              lYards++;
            }
          }
          newMap[y][x] = !(lYards >= 3);
        }

        // yards
        if (pos === false) {
          let lYards = 0;
          let trees = 0;
          for (const [nx, ny] of getNeis(x, y)) {
            if (this.map?.[ny]?.[nx] === false) lYards++;
            if (this.map?.[ny]?.[nx] === true) trees++;
          }
          newMap[y][x] = lYards >= 1 && trees >= 1 ? false : null;
        }
      }
    }

    this.map = newMap;
  }
}

export const getForestResourceValue = (input: string) => {
  const forest = new Forest(input);

  for (let i = 0; i < 10; i++) {
    forest.update();
  }

  console.log(forest.print());

  return forest.getResourceValue();
};

export const getForestResourceValueLong = (input: string) => {
  const forest = new Forest(input);

  const states = [];
  const forestStates = new Map<number, Forest>();
  let minutes = 0;
  let repeatIndex = -1;

  while (true) {
    forest.update();
    const forestPrint = forest.print();
    repeatIndex = states.indexOf(forestPrint);

    if (repeatIndex > 0) {
      break;
    }

    states.push(forestPrint);
    forestStates.set(minutes, forest.copy());

    minutes++;
  }

  const index = (1_000_000_000 - repeatIndex - 1) % (minutes - repeatIndex);

  return forestStates.get(repeatIndex + index).getResourceValue();
};
