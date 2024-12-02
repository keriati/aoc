const isValid = (line: number[]) => {
  if (line[0] < line[1]) {
    line.reverse();
  }

  for (let i = 0; i < line.length - 1; i++) {
    const diff = line[i] - line[i + 1];

    if (diff > 3 || diff < 1) {
      return false;
    }
  }

  return true;
};

export const getSafeReports = (input: string) =>
  input
    .split("\n")
    .map((line) => line.split(" ").map(Number))
    .filter(isValid).length;

export const getSafeReportsThisIsFine = (input: string) =>
  input
    .split("\n")
    .map((line) => line.split(" ").map(Number))
    .filter((line) => {
      for (let i = 0; i < line.length; i++) {
        const newLine = [...line];

        newLine.splice(i, 1);

        if (isValid(newLine)) {
          return true;
        }
      }

      return false;
    }).length;
