import { Deque } from "@blakeembrey/deque";

export const getSpinlockP1 = (steps: number, rounds: number): number => {
  const mySpinLock = new Deque([0]);

  for (let i = 1; i <= rounds; i++) {
    mySpinLock.rotate(-1 * steps);
    mySpinLock.insert(1, i);
    mySpinLock.rotate(-1);
  }

  return [...mySpinLock][1];
};

export const getSpinlockP2 = (steps: number, rounds: number): number => {
  const result = [null];
  let position = 0;

  for (let i = 0; i <= rounds; i++) {
    position = (steps + position) % i;
    if (position === 0) result.push(i);
    position = position < i ? position + 1 : 0;
  }

  return result.pop();
};
