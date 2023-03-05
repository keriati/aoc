import { createCombinations, lcm, range } from "../util/utils";

class Moon {
  x: number;

  y: number;

  z: number;

  vx = 0;

  vy = 0;

  vz = 0;

  constructor(public readonly id: number, x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  step() {
    this.x += this.vx;
    this.y += this.vy;
    this.z += this.vz;
  }
}

const parseMoons = (input: string) =>
  input.split("\n").map((line, i) => {
    const [, xPart, yPart, zPart] = line.match(
      /<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/
    );
    const x = Number(xPart);
    const y = Number(yPart);
    const z = Number(zPart);

    return new Moon(i, x, y, z);
  });

const updateVelocity = ([moonA, moonB]) => {
  if (moonA.x > moonB.x) {
    moonA.vx--;
    moonB.vx++;
  } else if (moonB.x > moonA.x) {
    moonB.vx--;
    moonA.vx++;
  }

  if (moonA.y > moonB.y) {
    moonA.vy--;
    moonB.vy++;
  } else if (moonB.y > moonA.y) {
    moonB.vy--;
    moonA.vy++;
  }

  if (moonA.z > moonB.z) {
    moonA.vz--;
    moonB.vz++;
  } else if (moonB.z > moonA.z) {
    moonB.vz--;
    moonA.vz++;
  }
};

const getPotKin = (moons: Moon[]) =>
  moons
    .map(
      ({ x, y, z, vx, vy, vz }) =>
        (Math.abs(x) + Math.abs(y) + Math.abs(z)) *
        (Math.abs(vx) + Math.abs(vy) + Math.abs(vz))
    )
    .reduce((sum, n) => sum + n, 0);

export const getTotalEnergy = (input: string, rounds: number) => {
  const moons = parseMoons(input);

  const moonPairs = createCombinations<Moon>(moons, 2);

  for (const step of range(rounds)) {
    moonPairs.forEach(updateVelocity);
    moons.forEach((moon) => {
      moon.step();
    });
  }

  return getPotKin(moons);
};

const isMatchingState = (
  moons: Moon[],
  moonsInitialState: Moon[],
  prop: string
) => {
  let matches = true;

  moons.forEach((moon, i) => {
    if (moon[prop] !== moonsInitialState[i][prop]) {
      matches = false;
    }
  });

  return matches;
};

export const getCycleSteps = (input: string) => {
  const moonsInitialState = parseMoons(input);

  const moons = parseMoons(input);

  const moonPairs = createCombinations<Moon>(moons, 2);

  let rounds = 1;

  let xRounds = null;
  let yRounds = null;
  let zRounds = null;

  while (true) {
    moonPairs.forEach(updateVelocity);

    moons.forEach((moon) => {
      moon.step();
    });

    if (isMatchingState(moons, moonsInitialState, "x")) {
      if (xRounds === null) {
        xRounds = rounds + 1;
      }
    }

    if (isMatchingState(moons, moonsInitialState, "y")) {
      if (yRounds === null) {
        yRounds = rounds + 1;
      }
    }

    if (isMatchingState(moons, moonsInitialState, "z")) {
      if (zRounds === null) {
        zRounds = rounds + 1;
      }
    }

    if (xRounds !== null && yRounds !== null && zRounds !== null) {
      return [xRounds, yRounds, zRounds].reduce(lcm);
    }

    rounds++;
  }
};
