import { range } from "../util/utils";

export const getResult = (input: string) =>
  input
    .split(",")
    .map((line) => line.split("-").map(Number) as [number, number])
    .reduce((result, [start, end]) => {
      for (let current = start; current <= end; current++) {
        const currentString = current + "";

        if (currentString.length % 2 === 0) {
          const front = currentString.slice(0, currentString.length / 2);
          const back = currentString.slice(currentString.length / 2);

          if (front === back) {
            result += current;
          }
        }
      }
      return result;
    }, 0);

export const getResultPart2 = (input: string) =>
  input
    .split(",")
    .map((line) => line.split("-") as [string, string])
    .reduce(
      (result, [start, end]) =>
        result +
        range(+start, +end + 1)
          .filter((n) => {
            return `${n}${n}`.indexOf(`${n}`, 1) !== `${n}`.length;
          })
          .reduce((acc, val) => acc + val, 0),
      0
    );
