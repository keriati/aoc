function countXMAS(lines: string[], x: number, y: number) {
  let result = 0;

  // check horizontal right
  if (
    lines[y][x + 1] === "M" &&
    lines[y][x + 2] === "A" &&
    lines[y][x + 3] === "S"
  ) {
    result++;
  }

  // check horizontal left
  if (
    lines[y][x - 1] === "M" &&
    lines[y][x - 2] === "A" &&
    lines[y][x - 3] === "S"
  ) {
    result++;
  }

  // check vertical down
  if (
    lines[y + 1] &&
    lines[y + 1][x] === "M" &&
    lines[y + 2] &&
    lines[y + 2][x] === "A" &&
    lines[y + 3] &&
    lines[y + 3][x] === "S"
  ) {
    result++;
  }

  // check vertical up
  if (
    lines[y - 1] &&
    lines[y - 1][x] === "M" &&
    lines[y - 2] &&
    lines[y - 2][x] === "A" &&
    lines[y - 3] &&
    lines[y - 3][x] === "S"
  ) {
    result++;
  }

  // check diagonal right down
  if (
    lines[y + 1] &&
    lines[y + 1][x + 1] === "M" &&
    lines[y + 2] &&
    lines[y + 2][x + 2] === "A" &&
    lines[y + 3] &&
    lines[y + 3][x + 3] === "S"
  ) {
    result++;
  }

  // check diagonal right up
  if (
    lines[y - 1] &&
    lines[y - 1][x + 1] === "M" &&
    lines[y - 2] &&
    lines[y - 2][x + 2] === "A" &&
    lines[y - 3] &&
    lines[y - 3][x + 3] === "S"
  ) {
    result++;
  }

  // check diagonal left down
  if (
    lines[y + 1] &&
    lines[y + 1][x - 1] === "M" &&
    lines[y + 2] &&
    lines[y + 2][x - 2] === "A" &&
    lines[y + 3] &&
    lines[y + 3][x - 3] === "S"
  ) {
    result++;
  }

  // check diagonal left up
  if (
    lines[y - 1] &&
    lines[y - 1][x - 1] === "M" &&
    lines[y - 2] &&
    lines[y - 2][x - 2] === "A" &&
    lines[y - 3] &&
    lines[y - 3][x - 3] === "S"
  ) {
    result++;
  }

  return result;
}

export const getXMASCount = (input: string) => {
  const lines = input.split("\n");

  let result = 0;

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === "X") {
        result += countXMAS(lines, x, y);
      }
    }
  }

  return result;
};

export const getX_MASCount = (input: string) => {
  const lines = input.split("\n");

  let result = 0;

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === "A") {
        // M M
        // S S
        if (
          lines[y - 1] &&
          lines[y - 1][x + 1] === "M" &&
          lines[y - 1][x - 1] === "M" &&
          lines[y + 1] &&
          lines[y + 1][x + 1] === "S" &&
          lines[y + 1][x - 1] === "S"
        ) {
          result++;
        }
        // S S
        // M M
        if (
          lines[y - 1] &&
          lines[y - 1][x + 1] === "S" &&
          lines[y - 1][x - 1] === "S" &&
          lines[y + 1] &&
          lines[y + 1][x + 1] === "M" &&
          lines[y + 1][x - 1] === "M"
        ) {
          result++;
        }
        // S M
        // S M
        if (
          lines[y - 1] &&
          lines[y - 1][x + 1] === "S" &&
          lines[y - 1][x - 1] === "M" &&
          lines[y + 1] &&
          lines[y + 1][x + 1] === "S" &&
          lines[y + 1][x - 1] === "M"
        ) {
          result++;
        }
        // M S
        // M S
        if (
          lines[y - 1] &&
          lines[y - 1][x + 1] === "M" &&
          lines[y - 1][x - 1] === "S" &&
          lines[y + 1] &&
          lines[y + 1][x + 1] === "M" &&
          lines[y + 1][x - 1] === "S"
        ) {
          result++;
        }
      }
    }
  }

  return result;
};
