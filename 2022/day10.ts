const measurePoints = new Set([20, 60, 100, 140, 180, 220]);

const getAmountFromInstruction = (instruction) =>
  Number.parseInt(instruction.split(" ")[1], 10);

const getStrength = (cycle, strength, x) => {
  if (measurePoints.has(cycle)) {
    strength += cycle * x;
  }
  return strength;
};

const processInstruction = (state, instruction) => {
  let { x, cycle, strength } = state;

  cycle += 1;
  strength = getStrength(cycle, strength, x);

  if (instruction === "noop") {
    return {
      x,
      cycle,
      strength,
    };
  }

  cycle += 1;
  x += getAmountFromInstruction(instruction);

  strength = getStrength(cycle, strength, x);

  return {
    x,
    cycle,
    strength,
  };
};

export const getSignalStrength = (input) => {
  const instructions = input.split("\n");

  const { strength } = instructions.reduce(processInstruction, {
    x: 1,
    cycle: 1,
    strength: 0,
  });

  return strength;
};

class Crt {
  screen: boolean[][] = [];

  constructor(width: number, height: number) {
    for (let i = 0; i < height; i += 1) {
      this.screen.push([]);
      for (let j = 0; j < width; j += 1) {
        this.screen[i][j] = false;
      }
    }
  }

  draw(cycle, x) {
    const row = Math.floor(cycle / 40);
    const col = cycle - row * 40;

    if (col === x || col === x - 1 || col === x + 1) {
      this.screen[row][col] = true;
    }
  }

  getScreeContent() {
    let temp = "\n";
    this.screen.forEach((row) => {
      row.forEach((col) => {
        temp += col ? "#" : ".";
      });
      temp += "\n";
    });

    return temp;
  }
}

const processInstructionCrt = (state, instruction) => {
  // eslint-disable-next-line prefer-const
  let { x, cycle, crt } = state;

  crt.draw(cycle, x);
  cycle += 1;

  if (instruction === "noop") {
    return {
      x,
      cycle,
      crt,
    };
  }

  crt.draw(cycle, x);
  cycle += 1;
  x += getAmountFromInstruction(instruction);

  return {
    x,
    cycle,
    crt,
  };
};

export const getCrtOutput = (input) => {
  const instructions = input.split("\n");

  const { crt } = instructions.reduce(processInstructionCrt, {
    x: 1,
    cycle: 0,
    crt: new Crt(40, 6),
  });

  return crt.getScreeContent();
};
