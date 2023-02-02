export const getResult = (input) => {
  const numbersArray = input.split("\n").map((n) => parseInt(n, 10));
  numbersArray.sort((a, b) => a - b);
  const max = numbersArray[numbersArray.length - 1];
  numbersArray.push(max + 3);
  const numbers = new Set(numbersArray);

  let joltDiff = 1;
  let jolt1 = 0;
  let jolt3 = 0;

  for (let i = 0; i < max + 3; i++) {
    const hasAdapter = numbers.has(i + 1);

    if (hasAdapter) {
      if (joltDiff === 1) jolt1++;
      if (joltDiff === 3) jolt3++;
      joltDiff = 1;
    } else {
      joltDiff++;
    }
  }

  return jolt1 * jolt3;
};

export const getResult2 = (input) => {
  const numbersArray = input.split("\n").map((n) => parseInt(n, 10));

  numbersArray.sort((a, b) => a - b);
  const max = numbersArray[numbersArray.length - 1];
  numbersArray.unshift(0);
  numbersArray.push(max + 3);
  const numbers = new Set(numbersArray);

  let run = 1;

  const runs: Map<number, number> = numbersArray.reduce((runs, n) => {
    if (numbers.has(n + 1)) {
      run++;
    } else {
      if (!runs.has(run)) runs.set(run, 0);
      runs.set(run, runs.get(run) + 1);
      run = 1;
    }

    return runs;
  }, new Map<number, number>());

  const tri = [1, 1, 2, 4, 7, 13];

  return Array.from(runs).reduce(
    (prod, [run, counts]) => prod * tri[run - 1] ** counts,
    1
  );
};
