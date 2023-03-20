const getNei = (x: number, y: number) => [
  [x + 1, y + 1],
  [x + 1, y],
  [x + 1, y - 1],
  [x, y - 1],
  [x - 1, y - 1],
  [x - 1, y],
  [x - 1, y + 1],
  [x, y + 1],
];

const turnCornersOn = (stuck: boolean, lights: boolean[][]) => {
  if (stuck) {
    lights[0][0] = true;
    lights[0][lights[0].length - 1] = true;
    lights[lights.length - 1][0] = true;
    lights[lights.length - 1][lights[0].length - 1] = true;
  }
};

export const getLightsOnCount = (input, stuck = false): number => {
  let lights: boolean[][] = input
    .split("\n")
    .map((l) => l.split("").map((c) => c === "#"));

  for (let i = 0; i < 100; i++) {
    turnCornersOn(stuck, lights);

    const newLights: boolean[][] = [];

    for (let y = 0; y < lights.length; y++) {
      newLights.push([]);
      for (let x = 0; x < lights[0].length; x++) {
        const nei = getNei(x, y);
        let on = 0;
        for (const [nx, ny] of nei) {
          if (lights?.[ny]?.[nx] === true) {
            on++;
          }
        }

        newLights[y][x] =
          lights[y][x] === true ? on === 2 || on === 3 : on === 3;
      }
    }
    lights = newLights;
  }

  turnCornersOn(stuck, lights);

  return lights.flat(2).reduce((s, c) => (c === true ? s + 1 : s), 0);
};
