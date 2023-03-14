const FACTOR_A = 16807;
const FACTOR_B = 48271; // prime
const DIVISOR = 2147483647; // prime

export const getJudgeCount = (a: number, b: number) => {
  const ROUNDS = 40_000_000;

  let nextA = a;
  let nextB = b;
  let score = 0;
  let i = 0;

  while (i < ROUNDS) {
    if ((nextA & 0xffff) === (nextB & 0xffff)) {
      score++;
    }
    nextA = (nextA * FACTOR_A) % DIVISOR;
    nextB = (nextB * FACTOR_B) % DIVISOR;
    i++;
  }

  return score;
};

const getNextDiv = (a: number, factor: number, div: number) => {
  let candidate = a;

  do {
    candidate = (candidate * factor) % DIVISOR;
  } while (candidate % div !== 0);

  return candidate;
};

export const getJudgeCount2 = (a: number, b: number) => {
  const ROUNDS = 5_000_000;

  let nextA = a;
  let nextB = b;
  let score = 0;
  let i = 0;

  while (i < ROUNDS) {
    if ((nextA & 0xffff) === (nextB & 0xffff)) {
      score++;
    }

    nextA = getNextDiv(nextA, FACTOR_A, 4);
    nextB = getNextDiv(nextB, FACTOR_B, 8);
    i++;
  }

  return score;
};
