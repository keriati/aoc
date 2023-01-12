export const getResult = (input, constantRate = true) => {
  const crabPositionsString = input.split(",");

  const crabPositions = crabPositionsString.map((pos) =>
    Number.parseInt(pos, 10)
  );

  const [min, max] = crabPositions.reduce(
    ([min, max], pos) => {
      min = pos < min ? pos : min;
      max = pos > max ? pos : max;

      return [min, max];
    },
    [0, 0]
  );

  const positionDistances = [];

  for (let pos = min; pos <= max; pos += 1) {
    let cost = 0;

    crabPositions.forEach((crabPosition) => {
      const d = Math.abs(pos - crabPosition);
      cost += constantRate ? d : (d * (d + 1)) / 2;
    });

    positionDistances.push({ pos, cost });
  }

  return positionDistances.sort((a, b) => a.cost - b.cost)[0].cost;
};
