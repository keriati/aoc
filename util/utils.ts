export const defaultDict = (init) =>
  new Proxy(
    {},
    {
      get: (target, name) =>
        name in target
          ? target[name]
          : (target[name] =
              typeof init === "function" ? new init().valueOf() : init),
    }
  );

export const ABC_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const ABC_LOWER = "abcdefghijklmnopqrstuvwxyz";

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
 * Returns a unique integer (as key) from 3 integers
 * @param a
 * @param b
 * @param c
 */
export const mk3n = (a: number, b: number, c: number): number =>
  (a * p1 + b) * p2 + c;

/**
 * Returns a unique integer (as key) from 2 unsigned integers
 * Uses Elegant Pairing
 * @param a
 * @param b
 */
export const mk2n = (a: number, b: number): number =>
  a >= b ? a * a + a + b : a + b * b;

/**
 * Returns a unique integer (as key) from 2 signed integers
 * Uses Elegant Pairing
 * @param a
 * @param b
 */
export const mk2ns = (a: number, b: number): number => {
  const A = a >= 0 ? 2 * a : -2 * a - 1;
  const B = b >= 0 ? 2 * b : -2 * b - 1;
  return mk2n(A, B) * 0.5;
};

/**
 * Unpair elegant pairing
 * @param z
 */
export const umk2ns = (z: number): [number, number] => {
  const sqrtz = Math.floor(Math.sqrt(z));
  const sqz = sqrtz * sqrtz;

  const result1 =
    z - sqz >= sqrtz ? [sqrtz, z - sqz - sqrtz] : [z - sqz, sqrtz];

  const xx = result1[0] % 2 === 0 ? result1[0] / 2 : result1[0] / -2 + 1;
  const yy = result1[1] % 2 === 0 ? result1[1] / 2 : result1[1] / -2 + 1;

  return [xx, yy];
};

export const intAHash = (nums: number[]) => {
  let h = 0;
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    result += h * 31 + nums[i];
    h++;
  }

  return result;
};

export const gcd = (a, b) => (a ? gcd(b % a, a) : b);

export const lcm = (a, b) => (a * b) / gcd(a, b);
