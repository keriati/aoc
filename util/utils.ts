import readline from "readline";

export const defaultDict = (Init) =>
  new Proxy(
    {},
    {
      get: (target, name) =>
        name in target
          ? target[name]
          : (target[name] =
              typeof Init === "function" ? new Init().valueOf() : Init),
    }
  );

export const ABC_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const ABC_LOWER = "abcdefghijklmnopqrstuvwxyz";

export const hexToBin = (hex: string): string =>
  hex
    .split("")
    .map((h) => parseInt(h, 16).toString(2).padStart(4, "0"))
    .join("");

/**
 * Returns the permutations of items
 *
 * @param items
 */
export const createPermutations = (items: string[]): string[][] => {
  if (items.length === 0) return [[]];

  const first = items[0];

  const allPermutations = [];

  for (const perm of createPermutations(items.slice(1))) {
    for (let i = 0; i <= perm.length; i++) {
      allPermutations.push([...perm.slice(0, i), first, ...perm.slice(i)]);
    }
  }

  return allPermutations;
};

/**
 * Returns all combinations of length from items
 *
 * @param items
 * @param length
 */
export const createCombinations = <T>(items: T[], length): T[][] => {
  if (items.length < length) return [];

  if (length === 0) return [[]];

  const first = items[0];
  const combosWithFirst = [];
  for (const combo of createCombinations(items.slice(1), length - 1)) {
    combosWithFirst.push([first, ...combo]);
  }

  const combosWithoutFirst = createCombinations(items.slice(1), length);
  return [...combosWithFirst, ...combosWithoutFirst];
};

/**
 * Returns all pairs from elements
 *
 * @param elements
 */
export const createPairs = <T>(elements: T[]): [T, T][] => {
  const pairs: [T, T][] = [];

  for (let i = 0; i < elements.length - 1; i++) {
    for (let j = i + 1; j < elements.length; j++) {
      pairs.push([elements[i], elements[j]]);
    }
  }

  return pairs;
};

/**
 * Returns an array of numbers from start to stop with step
 *
 * @param start
 * @param stop
 * @param step
 */
export function range(start, stop?, step = 1) {
  if (stop === undefined) {
    // one param defined
    stop = start;
    start = 0;
  }

  const result = [];

  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result;
}

const p1 = 311;
const p2 = 997;

/**
 * Returns a unique integer (as key) from 3 unsigned integers
 * @param a
 * @param b
 * @param c
 */
export const mk3n = (a: number, b: number, c: number): number =>
  (a * p1 + b) * p2 + c;

/**
 * Returns a unique integer (as key) from 2 unsigned integers
 * Uses Elegant Pairing
 * @param x
 * @param y
 */
export const mk2n = (x: number, y: number): number =>
  x >= y ? x * x + x + y : y * y + x;

/**
 * Unpair elegant pairing
 * @param z
 */
export const umk2n = (z: number): [number, number] => {
  const q = Math.floor(Math.sqrt(z));
  const l = z - q * q;
  return l < q ? [l, q] : [q, l - q];
};

/**
 * Returns a unique integer (as key) from 2 signed integers
 * Uses Elegant Pairing
 * @param a
 * @param b
 */
export const pairSInt = (a: number, b: number): number => {
  const A = a >= 0 ? 2 * a : -2 * a - 1;
  const B = b >= 0 ? 2 * b : -2 * b - 1;
  return mk2n(A, B);
};

/**
 * Unpair elegant pairing
 *
 * @param z
 */
export const uPairSInt = (z: number): [number, number] => {
  const sqrtz = Math.floor(Math.sqrt(z));
  const sqz = sqrtz * sqrtz;

  const result = z - sqz >= sqrtz ? [sqrtz, z - sqz - sqrtz] : [z - sqz, sqrtz];

  const xx = result[0] % 2 === 0 ? result[0] / 2 : (result[0] + 1) / -2;
  const yy = result[1] % 2 === 0 ? result[1] / 2 : (result[1] + 1) / -2;

  return [xx, yy];
};

/**
 * Returns a unique integer (as key) from multiple unsigned integers
 *
 * @param nums
 */
export const intAHash = (nums: number[]) => {
  let h = 0;
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    result += h * 31 + nums[i];
    h++;
  }

  return result;
};

/**
 * Returns the greatest common divisor of 2 numbers
 *
 * @param a
 * @param b
 */
export const gcd = (a, b) => (a ? gcd(b % a, a) : b);

/**
 * Returns the least common multiple of 2 numbers
 *
 * @param a
 * @param b
 */
export const lcm = (a, b) => (a * b) / gcd(a, b);

/**
 *  Async Sleep
 * @param ms
 */
export const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const booleanArrayToNumber = (arr: boolean[]): number =>
  arr.reduce(
    (acc, val, index) => acc + (val ? 1 : 0) * 2 ** (arr.length - 1 - index),
    0
  );

export const shuffleArray = <T>(array: T[]): T[] =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export const writeToTerminal = (x: number, y: number, text = " ") => {
  readline.cursorTo(process.stdout, x, y);
  process.stdout.write(text);
};
