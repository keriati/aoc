export const getBathroomCode = (input) => {
  const pad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  let x = 1;
  let y = 1;

  return input
    .split("\n")
    .map((l) => l.split(""))
    .map((l) => {
      l.forEach((m) => {
        if (m === "R" && x < 2) x++;
        if (m === "L" && x > 0) x--;
        if (m === "U" && y > 0) y--;
        if (m === "D" && y < 2) y++;
      });

      return pad[y][x];
    })
    .reduce((s, v) => s + v, "");
};

export const getBathroomCode2 = (input) => {
  const pad = [
    [0, 0, 1, 0, 0],
    [0, 2, 3, 4, 0],
    [5, 6, 7, 8, 9],
    [0, "A", "B", "C", 0],
    [0, 0, "D", 0, 0],
  ];

  let x = 0;
  let y = 2;

  return input
    .split("\n")
    .map((l) => l.split(""))
    .map((l) => {
      l.forEach((m) => {
        let tx = x;
        let ty = y;
        if (m === "R" && x < 4) tx++;
        if (m === "L" && x > 0) tx--;
        if (m === "U" && y > 0) ty--;
        if (m === "D" && y < 4) ty++;

        if (pad[ty][tx] !== 0) {
          x = tx;
          y = ty;
        }
      });

      return pad[y][x];
    })
    .reduce((s, v) => s + v, "");
};
