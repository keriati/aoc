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
 * Returns a unique integer (as key) from 2 integers
 * Uses Elegant Pairing
 * @param a
 * @param b
 */
export const mk2n = (a: number, b: number): number =>
  a >= b ? a * a + a + b : a + b * b;
