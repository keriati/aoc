import { IntCodeComputer, STATUS_FINISHED } from "./IntCode09";

export const getBlocks = (input) => {
  const code = input.split(",").map((n) => Number(n));

  const myPC = new IntCodeComputer(code);

  myPC.run();

  const result = myPC.getFullOutput();
  let blockTiles = 0;
  for (let i = 0; i < result.length; i++) {
    if ((i + 1) % 3 === 0 && result[i] === 2) {
      blockTiles++;
    }
  }

  return blockTiles;
};

export const getFinalScore = (input) => {
  const code = input.split(",").map((n) => Number(n));

  code[0] = 2;

  const myPC = new IntCodeComputer(code);

  while (true) {
    const status = myPC.run();

    const result = myPC.getFullOutput();

    let ballPosition = 0;
    let paddlePosition = 0;
    let score = 0;

    for (let i = 0; i < result.length - 2; i += 3) {
      const x = result[i];
      const y = result[i + 1];
      const tile = result[i + 2];

      if (tile === 4) ballPosition = x;
      if (tile === 3) paddlePosition = x;

      if (x === -1 && y === 0) {
        score = tile;
      }
    }

    if (status === STATUS_FINISHED) {
      return score;
    }

    if (ballPosition < paddlePosition) myPC.addInput(-1);
    if (ballPosition > paddlePosition) myPC.addInput(1);
    if (ballPosition === paddlePosition) myPC.addInput(0);
  }
};
