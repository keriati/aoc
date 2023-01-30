const runCode = (
  noun: number,
  verb: number,
  instructions: number[]
): number => {
  const ins = [...instructions];

  ins[1] = noun;
  ins[2] = verb;

  let com = ins[0];

  for (let i = 0; com !== 99; i += 4) {
    if (com === 1) {
      ins[ins[i + 3]] = ins[ins[i + 1]] + ins[ins[i + 2]];
    }

    if (com === 2) {
      ins[ins[i + 3]] = ins[ins[i + 1]] * ins[ins[i + 2]];
    }

    com = ins[i + 4];
  }

  return ins[0];
};

export const getProgramValue = (input: string): number => {
  const data = input.split(",").map((c) => parseInt(c, 10));

  return runCode(12, 2, data);
};

export const findParams = (input: string): number | null => {
  const data = input.split(",").map((c) => parseInt(c, 10));

  for (let a = 0; a <= 99; a++) {
    for (let b = 0; b <= 99; b++) {
      if (runCode(a, b, data) === 19690720) {
        return 100 * a + b;
      }
    }
  }

  return null;
};
