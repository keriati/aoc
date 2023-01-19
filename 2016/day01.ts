const directionChange = {
  N: ["E", "W"],
  E: ["S", "N"],
  S: ["W", "E"],
  W: ["N", "S"],
};

export const getDistance = (input) => {
  const [x, y] = input.split(", ").reduce(
    ([x, y, d], instruction) => {
      const turn = instruction[0] === "R" ? 0 : 1;
      const distance = parseInt(instruction.substring(1), 10);
      const newDirection = directionChange[d][turn];

      if (newDirection === "N") return [x, y + distance, newDirection];
      if (newDirection === "E") return [x + distance, y, newDirection];
      if (newDirection === "S") return [x, y - distance, newDirection];
      return [x - distance, y, newDirection];
    },
    [0, 0, "N"]
  );

  return Math.abs(x + y);
};

export const getDistanceToTwiceVisited = (input) => {
  const instructions = input.split(", ");

  let x = 0;
  let y = 0;
  let d = "N";
  const visited = new Set([`${x},${y}`]);

  for (const instruction of instructions) {
    const turn = instruction[0] === "R" ? 0 : 1;
    const distance = parseInt(instruction.substring(1), 10);
    let dx = 0;
    let dy = 0;

    d = directionChange[d][turn];

    if (d === "N") dy = 1;
    if (d === "E") dx = 1;
    if (d === "S") dy = -1;
    if (d === "W") dx = -1;

    for (let i = 0; i < distance; i++) {
      x += dx;
      y += dy;

      if (visited.has(`${x},${y}`)) return Math.abs(x + y);

      visited.add(`${x},${y}`);
    }
  }

  return null;
};
