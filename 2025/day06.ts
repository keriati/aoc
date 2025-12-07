import { rotateCounterClockwise } from "../util/matrix";

export const getResult = (input: string) => {
  const lines = input.split("\n");
  const numLines = lines
    .slice(0, -1)
    .map((line) => line.trim().split(/\s+/).map(Number));
  const operations = lines[lines.length - 1].trim().split(/\s+/);

  const numRotate = rotateCounterClockwise(numLines).reverse();

  let result = 0;

  for (let i = 0; i < numRotate.length; i++) {
    result += numRotate[i].reduce((acc, curr) => {
      const operation = operations[i];

      if (operation === "*") {
        return (acc === 0 ? 1 : acc) * curr;
      } else if (operation === "+") {
        return acc + curr;
      }
    }, 0);
  }

  return result;
};

export const getResultPart2 = (input: string) => {
  const lines = input.split("\n");
  const operations = lines[lines.length - 1].trim().split(/\s+/);

  return rotateCounterClockwise(
    lines.slice(0, -1).map((line) => line.split(""))
  )
    .map((line) => +line.join("").replaceAll(" ", ""))
    .reverse()
    .reduce(
      (
        [result, partial, operations]: [number, number, string[]],
        num,
        i,
        numbers
      ) => {
        if (num === 0) {
          operations.shift();
          return [result + partial, 0, operations];
        }

        if (operations[0] === "*") {
          if (i === numbers.length - 1) {
            return [result + Math.max(1, partial) * num, 0, operations];
          }
          return [result, Math.max(1, partial) * num, operations];
        }

        return [result + num, 0, operations];
      },
      [0, 0, operations]
    )[0];
};
