export const getCalibrationValueSum = (input) =>
  input
    .split("\n")
    .map((line) => {
      const first: string = line.split("").find((c) => /\d/.test(c));
      const last: string = line
        .split("")
        .reverse()
        .find((c) => /\d/.test(c));

      return parseInt(first + last, 10);
    })
    .reduce((a, b) => a + b, 0);

const digits: Record<string, string> = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const getFirstDigit = (line: string) => {
  let first = null;

  for (let i = 0; i < line.length; i++) {
    if (/\d/.test(line[i])) {
      first = Number(line[i]);
      break;
    }

    for (const digit in digits) {
      if (line.substring(i, i + digit.length) === digit) {
        first = digits[digit];
        break;
      }
    }

    if (first !== null) break;
  }

  return first;
};

const getLastDigit = (line) => {
  let last = null;

  for (let i = line.length - 1; i >= 0; i--) {
    if (/\d/.test(line[i])) {
      last = Number(line[i]);
      break;
    }

    for (const digit in digits) {
      if (line.substring(i, i + digit.length) === digit) {
        last = digits[digit];
        break;
      }
    }

    if (last !== null) break;
  }

  return last;
};

export const getCalibrationValueSumP2 = (input) =>
  input
    .split("\n")
    .map((line) => Number(`${getFirstDigit(line)}${getLastDigit(line)}`))
    .reduce((num, sum) => num + sum, 0);
