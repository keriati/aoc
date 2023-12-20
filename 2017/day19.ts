const isLetter = (char: string) => /[a-zA-Z]/.test(char);

export const findLettersAndSteps = (input: string) => {
  const map = input.split("\n").map((line) => line.split(""));

  const startX = map[0].findIndex((char) => char === "|");
  const startY = 0;

  let dx = 0;
  let dy = 1;

  const letters = [];

  const queue = [{ x: startX, y: startY }];

  let steps = 0;

  while (queue.length) {
    const { x, y } = queue.pop();
    const pos = map[y][x];

    if (isLetter(pos)) letters.push(pos);

    steps++;

    if (pos === "+") {
      if (dx !== 0) {
        dx = 0;
        dy = map[y - 1][x] === " " ? 1 : -1;
      } else {
        dx = map[y][x - 1] === " " ? 1 : -1;
        dy = 0;
      }
    }

    if (map?.[y + dy]?.[x + dx] === undefined) continue;
    queue.push({ x: x + dx, y: y + dy });
  }

  return [letters.join(""), steps - 1];
};
