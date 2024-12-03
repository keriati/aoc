export const getMultiplicationResult = (input: string) =>
  input
    .split("\n")
    .join("")
    .match(/mul\(\d+,\d+\)/g)
    .map((mul) => mul.match(/\d+/g).map(Number))
    .reduce((acc, [a, b]) => acc + a * b, 0);

export const getMultiplicationResultCleaned = (input: string) =>
  input
    .split("\n")
    .join("")
    .split("do()")
    .map((line) => line.split("don't()")[0])
    .reduce((acc, line) => acc + getMultiplicationResult(line), 0);
