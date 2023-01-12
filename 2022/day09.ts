// eslint-disable-next-line max-classes-per-file
interface Position {
  x: number;
  y: number;
}

type Direction = "R" | "L" | "U" | "D";

export class Knot implements Position {
  x: number;

  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  isTouching(k: Knot) {
    const xDistance = Math.abs(this.x - k.x);
    const yDistance = Math.abs(this.y - k.y);
    return xDistance <= 1 && yDistance <= 1;
  }
}

class HeadKnot extends Knot {
  updatePosition(direction: Direction) {
    if (direction === "R") {
      this.x += 1;
    }

    if (direction === "L") {
      this.x -= 1;
    }

    if (direction === "U") {
      this.y += 1;
    }

    if (direction === "D") {
      this.y -= 1;
    }
  }
}

class TailKnot extends Knot {
  updatePosition(direction: Direction, head: Knot) {
    if (this.isTouching(head)) {
      return;
    }

    // Diagonal movement
    // converting x distances to +-1
    if (head.x !== this.x) {
      this.x += (head.x - this.x) / Math.abs(head.x - this.x);
    }

    // converting y distances to +-1
    if (head.y !== this.y) {
      this.y += (head.y - this.y) / Math.abs(head.y - this.y);
    }
  }

  static create(num: number): TailKnot[] {
    const result = [];
    for (let i = 0; i < num; i += 1) {
      result.push(new TailKnot(0, 0));
    }
    return result;
  }
}

function processCommands(commands: string[], tails: number) {
  return commands.reduce(
    (state, command) => {
      const { head, knots, visited } = state;
      const [direction, stepsString] = command.split(" ") as [
        Direction,
        string
      ];
      const steps = Number.parseInt(stepsString, 10);

      for (let j = 0; j < steps; j += 1) {
        head.updatePosition(direction);

        knots.forEach((knot, c) => {
          const myHead = c === 0 ? head : knots[c - 1];

          knot.updatePosition(direction, myHead);

          if (c === tails - 1) {
            visited.push(`${knot.x},${knot.y}`);
          }
        });
      }

      return {
        head,
        knots,
        visited,
      };
    },
    {
      head: new HeadKnot(0, 0),
      knots: TailKnot.create(tails),
      visited: [],
    }
  );
}

export const getNumberOfPositionsVisited = (input) => {
  const commands = input.split("\n");

  const { visited } = processCommands(commands, 1);
  return new Set(visited).size;
};

export const getNumberOfPositionsVisitedLong = (input) => {
  const commands = input.split("\n");

  const { visited } = processCommands(commands, 9);
  return new Set(visited).size;
  // return visited;
};
