const getPassId = (bPass: string) => {
  let row = 127;
  let col = 7;

  bPass
    .substring(0, 7)
    .split("")
    .forEach((c, i) => {
      const myOffset = 128 / 2 ** (i + 1);
      if (c === "F") row -= myOffset;
    });

  bPass
    .substring(7)
    .split("")
    .forEach((c, i) => {
      const myOffset = 8 / 2 ** (i + 1);
      if (c === "L") col -= myOffset;
    });

  const id = row * 8 + col;
  return id;
};

export const getHighestSeatID = (input) => {
  const lines = input.split("\n");

  return lines.reduce((s: number, pass: string) => {
    const id = getPassId(pass);
    return id > s ? id : s;
  }, 0);
};

export const getMySeatID = (input) => {
  const lines = input.split("\n");

  return (
    lines
      .map((pass: string) => getPassId(pass))
      .sort((a, b) => a - b)
      .find((id, i, ids) => {
        if (i === 0 || i === lines.length - 1) return false;
        return !ids.includes(id + 1);
      }) + 1
  );
};
