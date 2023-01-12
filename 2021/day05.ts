class Vent {
  public readonly start: [number, number];

  public readonly end: [number, number];

  public readonly positions: Set<string> = new Set();

  constructor(line: string) {
    const [, XStartString, YStartString, XEndString, YEndString] = line.match(
      /^(\d+),(\d+) -> (\d+),(\d+)$/
    );

    this.start = [
      Number.parseInt(XStartString, 10),
      Number.parseInt(YStartString, 10),
    ];

    this.end = [
      Number.parseInt(XEndString, 10),
      Number.parseInt(YEndString, 10),
    ];

    let x = this.start[0];
    let y = this.start[1];

    this.positions.add(`${x},${y}`);

    do {
      x +=
        this.start[0] === this.end[0]
          ? 0
          : this.start[0] < this.end[0]
          ? 1
          : -1;
      y +=
        this.start[1] === this.end[1]
          ? 0
          : this.start[1] < this.end[1]
          ? 1
          : -1;
      this.positions.add(`${x},${y}`);
    } while (x !== this.end[0] || y !== this.end[1]);
  }
}

class OceanFloor {
  constructor(public readonly vents: Vent[]) {}

  getDangerousPointCount(ignoreDiagonals) {
    const myVents = ignoreDiagonals
      ? this.vents.filter(
          (vent) =>
            vent.start[0] === vent.end[0] || vent.start[1] === vent.end[1]
        )
      : this.vents;

    const dangerLevels: Map<string, number> = new Map();

    myVents.forEach((vent) => {
      vent.positions.forEach((position) => {
        if (!dangerLevels.has(position)) {
          dangerLevels.set(position, 0);
        }

        dangerLevels.set(position, dangerLevels.get(position) + 1);
      });
    });

    return Array.from(dangerLevels).filter(([key, value]) => value > 1).length;
  }
}

export const getResult = (input, ignoreDiagonals = false) => {
  const inputLines = input.split("\n");

  const vents = inputLines.map((line) => new Vent(line));

  const ocean = new OceanFloor(vents);

  return ocean.getDangerousPointCount(ignoreDiagonals);
};
