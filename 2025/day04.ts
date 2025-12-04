export const getResult = (input: string) => {
  const lines = input.split("\n").map((line) => line.split(""));
  let result = 0;

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === "@") {
        let adjacentCount = 0;

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dy === 0 && dx === 0) continue;

            const newY = y + dy;
            const newX = x + dx;

            if (
              newY >= 0 &&
              newY < lines.length &&
              newX >= 0 &&
              newX < lines[y].length &&
              lines[newY][newX] === "@"
            ) {
              adjacentCount++;
            }
          }
        }
        if (adjacentCount < 4) {
          result++;
        }
      }
    }
  }

  return result;
};

export const getResultPart2 = (input: string) => {
  const lines = input.split("\n").map((line) => line.split(""));
  let total = 0;

  while (true) {
    let result = 0;
    let removed = [];

    for (let y = 0; y < lines.length; y++) {
      for (let x = 0; x < lines[y].length; x++) {
        if (lines[y][x] === "@") {
          let adjacentCount = 0;

          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dy === 0 && dx === 0) continue;

              const newY = y + dy;
              const newX = x + dx;

              if (
                newY >= 0 &&
                newY < lines.length &&
                newX >= 0 &&
                newX < lines[y].length &&
                lines[newY][newX] === "@"
              ) {
                adjacentCount++;
              }
            }
          }

          if (adjacentCount < 4) {
            result++;
            removed.push([y, x]);
          }
        }
      }
    }

    for (const [y, x] of removed) {
      lines[y][x] = "x";
    }

    total += result;

    if (result === 0) {
      break;
    }
  }

  return total;
};
