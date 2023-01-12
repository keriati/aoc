export const getHouseCount = (input) => {
  const steps = input.split("");

  const { visited } = steps.reduce(
    ({ position: [x, y], visited }, step) => {
      if (step === "^") y += 1;
      if (step === "v") y -= 1;
      if (step === ">") x += 1;
      if (step === "<") x -= 1;

      visited.add(`${x},${y}`);

      return {
        position: [x, y],
        visited,
      };
    },
    { position: [0, 0], visited: new Set([`0,0`]) }
  );

  return visited.size;
};

export const getHouseCountWithRobot = (input) => {
  const steps = input.split("");

  const { visited } = steps.reduce(
    ({ position, roboPosition, visited }, step, i) => {
      const myPosition = i % 2 === 0 ? position : roboPosition;

      if (step === ">") myPosition[0] += 1;
      if (step === "<") myPosition[0] -= 1;
      if (step === "^") myPosition[1] += 1;
      if (step === "v") myPosition[1] -= 1;

      visited.add(`${myPosition[0]},${myPosition[1]}`);

      return {
        position,
        roboPosition,
        visited,
      };
    },
    { position: [0, 0], roboPosition: [0, 0], visited: new Set([`0,0`]) }
  );

  return visited.size;
};
