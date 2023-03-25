export const getSafeTiles = (input: string, lineCount: number) => {
  const lines = input.split("\n").map((l) => l.split("").map((t) => t === "."));

  for (let i = 1; i < lineCount; i++) {
    const newLine = [];
    const prevLine = [true, ...lines[i - 1], true];

    for (let j = 1; j < prevLine.length - 1; j++) {
      let newTile = true;

      const left = prevLine[j - 1];
      const center = prevLine[j];
      const right = prevLine[j + 1];
      if (left === false && center === false && right === true) {
        newTile = false;
      } else if (left === true && center === false && right === false) {
        newTile = false;
      } else if (left === false && center === true && right === true) {
        newTile = false;
      } else if (left === true && center === true && right === false) {
        newTile = false;
      }

      newLine.push(newTile);
    }

    lines.push(newLine);
  }

  return lines.flat(2).reduce((s, t) => (t ? s + 1 : s), 0);
};
