const getNextNumber = (line: number[]): number => {
  if (line.every((e) => e === 0)) {
    return 0;
  }

  const nextLine = line.reduce(
    (nl: number[], num, i) => (i < 1 ? nl : [...nl, num - line[i - 1]]),
    []
  );

  return line[line.length - 1] + getNextNumber(nextLine);
};

export const getExtrapolatedSum = (input: string): number =>
  input
    .split("\n")
    .map((line) => line.split(" ").map(Number))
    .map((line) => [...line, getNextNumber(line)])
    .reduce((sum, line) => sum + line[line.length - 1], 0);

export const getExtrapolatedSumReverse = (input: string) =>
  input
    .split("\n")
    .map((line) => line.split(" ").map(Number).reverse())
    .map((line) => [...line, getNextNumber(line)])
    .reduce((sum, line) => sum + line[line.length - 1], 0);
