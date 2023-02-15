const findMaxIndex = (banks: number[]) =>
  banks.reduce(
    ({ max, index }, val, i) => {
      if (val > max) {
        max = val;
        index = i;
      }

      return { max, index };
    },
    { max: 0, index: 0 }
  ).index;

export const getResult = (input: string) => {
  const banks: number[] = input.split(" ").map((n) => Number(n));

  const stateCache = new Map<string, number>();

  let rounds = 1;

  while (true) {
    let index = findMaxIndex(banks);
    let val = banks[index];
    banks[index] = 0;

    while (val > 0) {
      index++;

      if (index >= banks.length) index = 0;

      banks[index]++;

      val--;
    }

    const state = banks.join(",");

    if (stateCache.has(state)) return [rounds, rounds - stateCache.get(state)];

    stateCache.set(state, rounds);

    rounds++;
  }
};
