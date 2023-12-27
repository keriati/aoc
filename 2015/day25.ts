const getNumberAtPosition = (row: number, column: number) => {
  const sum = row + column - 1;
  const sumTri = (sum * (sum + 1)) / 2;
  return sumTri - row + 1;
};

export const getCodeForMachine = (row: number, column: number) => {
  const numberOfCode = getNumberAtPosition(row, column);

  let code = 20151125;
  for (let i = 1; i < numberOfCode; i++) {
    code = (code * 252533) % 33554393;
  }

  return code;
};
