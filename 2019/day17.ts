import { IntCodeComputer } from "./IntCode09";

const NORTH = 0;
const EAST = 1;
const SOUTH = 2;
const WEST = 3;

type Move = "R" | "L" | "F";
type Path = Move[];

export const getAlignmentParams = (input) => {
  const code = input.split(",").map(Number);
  const myComputer = new IntCodeComputer(code);

  myComputer.run();

  const result = myComputer.getFullOutput();
  const decodedResult = result.map((n) => String.fromCharCode(n)).join("");

  console.log(decodedResult);

  const map = decodedResult.split("\n").map((l) => l.split(""));

  const alignmentParameters = [];

  for (let y = 1; y < map.length - 1; y++) {
    for (let x = 1; x < map[y].length - 1; x++) {
      if (map[y][x] === "#") {
        if (
          map[y - 1][x] === "#" &&
          map[y + 1][x] === "#" &&
          map[y][x - 1] === "#" &&
          map[y][x + 1] === "#"
        ) {
          alignmentParameters.push(y * x);
        }
      }
    }
  }

  return alignmentParameters.reduce((s, n) => s + n, 0);
};

const h = (x: number, y: number) => (x + 1) * 1000 + y + 1;

const getNeighbors = (
  scaffoldMap: Set<number>,
  [x, y]: [number, number],
  direction: number
): [number, number, number][] => {
  const result = [];
  let neis = [
    [x + 1, y, EAST],
    [x - 1, y, WEST],
    [x, y - 1, NORTH],
    [x, y + 1, SOUTH],
  ];

  neis = neis.filter(([, , nDir]) => {
    if (direction === NORTH)
      return nDir === direction || nDir === EAST || nDir === WEST;
    if (direction === WEST)
      return nDir === direction || nDir === SOUTH || nDir === NORTH;
    if (direction === EAST)
      return nDir === direction || nDir === SOUTH || nDir === NORTH;
    if (direction === SOUTH)
      return nDir === direction || nDir === EAST || nDir === WEST;
    return false;
  });

  for (const [nx, ny, dir] of neis) {
    if (scaffoldMap.has(h(nx, ny))) result.push([nx, ny, dir]);
  }

  return result;
};

const TURNS = {};
TURNS[NORTH] = {};
TURNS[NORTH][WEST] = "L";
TURNS[NORTH][EAST] = "R";

TURNS[WEST] = {};
TURNS[WEST][NORTH] = "R";
TURNS[WEST][SOUTH] = "L";

TURNS[SOUTH] = {};
TURNS[SOUTH][WEST] = "R";
TURNS[SOUTH][EAST] = "L";

TURNS[EAST] = {};
TURNS[EAST][NORTH] = "L";
TURNS[EAST][SOUTH] = "R";

const printMap = (scaffoldMap: Set<number>, [px, py]: [number, number]) => {
  const result = [];
  for (let y = 0; y < 50; y++) {
    result.push("\n");
    for (let x = 0; x < 50; x++) {
      if (x === px && y === py) {
        result.push("^");
      } else if (scaffoldMap.has(h(x, y))) {
        result.push("#");
      } else {
        result.push(".");
      }
    }
  }
  console.log(result.join(""));
};

function createScaffoldMap(map: string[][]) {
  const scaffoldMap = new Set<number>();
  let position = null;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "#") {
        scaffoldMap.add(h(x, y));
      }
      if (map[y][x] === "^") {
        position = [x, y];
      }
    }
  }
  return { scaffoldMap, position };
}

const stringToAscii = (input: string) =>
  input.split("").map((c) => c.charCodeAt(0));

export const getCollectedDust = (input) => {
  const code = input.split(",").map(Number);
  const myComputer = new IntCodeComputer(code);

  myComputer.run();

  const result = myComputer.getFullOutput();
  const decodedResult = result.map((n) => String.fromCharCode(n)).join("");

  const map = decodedResult.split("\n").map((l) => l.split(""));

  let { scaffoldMap, position } = createScaffoldMap(map);

  const path: Path = [];
  let dir = NORTH;

  while (true) {
    // printMap(scaffoldMap, position);
    const neis = getNeighbors(scaffoldMap, position, dir);

    if (neis.length === 0) {
      break;
    }

    if (neis.length === 1) {
      const [nx, ny, nDir] = neis[0];

      if (dir !== nDir) {
        const turn = TURNS[dir][nDir];
        path.push(turn);
        dir = nDir;
      }

      position = [nx, ny];
      path.push("F");
      continue;
    }

    if (neis.length > 1) {
      const [nx, ny] = position;

      switch (dir) {
        case NORTH:
          position = [nx, ny - 2];
          path.push("F");
          path.push("F");
          break;

        case SOUTH:
          position = [nx, ny + 2];
          path.push("F");
          path.push("F");
          break;

        case WEST:
          position = [nx - 2, ny];
          path.push("F");
          path.push("F");
          break;

        case EAST:
          position = [nx + 2, ny];
          path.push("F");
          path.push("F");
          break;
        default:
      }
    }
  }

  const botCommands = path.reduce(
    ([result, forwardLength], step, i, a): [(string | number)[], number] => {
      if (step === "F") {
        if (i === a.length - 1) result.push(forwardLength + 1);
        return [result, forwardLength + 1];
      }

      if (forwardLength !== 0) {
        result.push(forwardLength);
      }
      result.push(step);

      return [result, 0];
    },
    [[], 0] as [(string | number)[], number]
  )[0];

  console.log(botCommands.join(""));

  /**
   * Path made by hand :/
   *
   * A,B,A,B,A,C,B,C,A,C
   *
   * A: L,10,L,12,R,6
   * B: R,10,L,4,L,4,L,12
   * C: L,10,R,10,R,6,L,4
   *
   */

  const routine = stringToAscii(`A,B,A,B,A,C,B,C,A,C`);
  const routineA = stringToAscii(`L,10,L,12,R,6`);
  const routineB = stringToAscii(`R,10,L,4,L,4,L,12`);
  const routineC = stringToAscii(`L,10,R,10,R,6,L,4`);

  const fullInput = [
    ...routine,
    10,
    ...routineA,
    10,
    ...routineB,
    10,
    ...routineC,
    10,
    `n`.charCodeAt(0),
    10,
  ];

  const codeP2 = [...code];
  codeP2[0] = 2;
  const myComputer2 = new IntCodeComputer(codeP2);

  fullInput.forEach((i) => myComputer2.addInput(i));

  myComputer2.run();

  return myComputer2.getFullOutput().pop();
};
