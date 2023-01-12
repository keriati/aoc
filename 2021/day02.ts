export const getPosition = (input) => {
  const movements = input.split("\n");

  const position = {
    forward: 0,
    down: 0,
    up: 0,
  };

  for (let i = 0; i < movements.length; i += 1) {
    const [direction, amount] = movements[i].split(" ");

    position[direction] += Number.parseInt(amount, 10);
  }

  return position.forward * (position.down - position.up);
};

export const getPositionAlt = (input) => {
  const movements = input.split("\n");
  let aim = 0;

  const position = {
    x: 0,
    y: 0,
  };

  for (let i = 0; i < movements.length; i += 1) {
    const [direction, amountString] = movements[i].split(" ");

    const amount = Number.parseInt(amountString, 10);

    if (direction === "down") aim += amount;
    if (direction === "up") aim -= amount;
    if (direction === "forward") {
      position.x += amount;

      position.y += aim * amount;
    }
  }

  return position.x * position.y;
};
