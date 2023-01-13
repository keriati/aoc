export const getResultPart1 = (input) => {
  const rawLines = input.split("\n");
  const parsedLines = [];

  rawLines.forEach((line) => eval(`parsedLines.push(${line})`));

  return rawLines
    .map((rawLine, i) => rawLine.length - parsedLines[i].length)
    .reduce((sum, i) => sum + i, 0);
};

export const getResultPart2 = (input) => {
  const rawLines = input.split("\n");
  const escapedLines = [];

  rawLines.forEach((line) => escapedLines.push(JSON.stringify(`${line}`)));

  return rawLines
    .map((rawLine, i) => escapedLines[i].length - rawLine.length)
    .reduce((sum, i) => sum + i, 0);
};
