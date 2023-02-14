const OPCODE_ADD = 1;
const OPCODE_MULTI = 2;

const run = (intCodes: number[], noun: number, verb: number): number[] => {
  const program = [...intCodes];

  program[1] = noun;
  program[2] = verb;

  let opcode = program[0];

  for (let i = 0; opcode !== 99; i += 4) {
    const arg1 = program[program[i + 1]];
    const arg2 = program[program[i + 2]];
    const outPosition = program[i + 3];

    if (OPCODE_ADD === opcode) {
      program[outPosition] = arg1 + arg2;
    }

    if (OPCODE_MULTI === opcode) {
      program[outPosition] = arg1 * arg2;
    }

    opcode = program[i + 4];
  }

  return program;
};

export const getProgramValue = (input: string): number => {
  const data = input.split(",").map((c) => parseInt(c, 10));

  return run(data, 12, 2)[0];
};

export const findParams = (input: string): number | null => {
  const data = input.split(",").map((c) => parseInt(c, 10));

  for (let a = 0; a <= 99; a++) {
    for (let b = 0; b <= 99; b++) {
      if (run(data, a, b)[0] === 19690720) {
        return 100 * a + b;
      }
    }
  }

  return null;
};
