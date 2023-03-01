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
