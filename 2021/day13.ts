const createPaper = (pointsInput: string) => {
  const myPaper = [];

  pointsInput.split("\n").forEach((pointInput) => {
    const [x, y] = pointInput.split(",");
    const point = [Number.parseInt(x, 10), Number.parseInt(y, 10)];
    myPaper.push(point);
  });

  return myPaper;
};

function fold(myPaper: [number, number][], line: "x" | "y", distance: number) {
  return myPaper.map(([x, y]) => {
    if (line === "y") {
      if (y > distance) {
        return [x, distance - (y - distance)];
      }
    }

    if (line === "x") {
      if (x > distance) {
        return [distance - (x - distance), y];
      }
    }

    return [x, y];
  });
}

export const getResult = (input) => {
  const [pointsInput, foldsInput] = input.split("\n\n");

  const [line, distanceString] = foldsInput
    .split("\n")[0]
    .split(" along ")[1]
    .split("=");
  const distance = Number.parseInt(distanceString, 10);

  const myPaper = createPaper(pointsInput);

  const folded = fold(myPaper, line, distance);

  const points = new Set(folded.map(([x, y]) => `${x},${y}`));

  return points.size;
};

export const getResultPart2 = (input) => {
  const [pointsInput, foldsInput] = input.split("\n\n");

  let myPaper = createPaper(pointsInput);

  foldsInput.split("\n").forEach((folding) => {
    const [line, distanceString] = folding.split(" along ")[1].split("=");
    const distance = Number.parseInt(distanceString, 10);
    myPaper = fold(myPaper, line, distance);
  });

  const points = new Set(myPaper.map(([x, y]) => `${x},${y}`));

  let result = "";

  for (let y = 0; y < 6; y += 1) {
    result += `\n`;
    for (let x = 0; x < 40; x += 1) {
      if (points.has(`${x},${y}`)) {
        result += `#`;
      } else {
        result += ` `;
      }
    }
  }

  return result;
};
