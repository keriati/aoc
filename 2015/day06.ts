function parseInstruction(instruction: string) {
  const [, n1s, n2s, n3s, n4s] = instruction.match(
    /(\d+),(\d+) through (\d+),(\d+)$/
  );

  const n1 = Number.parseInt(n1s, 10);
  const n2 = Number.parseInt(n2s, 10);
  const n3 = Number.parseInt(n3s, 10);
  const n4 = Number.parseInt(n4s, 10);

  const xs = Math.min(n1, n3);
  const ys = Math.min(n2, n4);
  const xe = Math.max(n1, n3);
  const ye = Math.max(n2, n4);
  return { xs, ys, xe, ye };
}

export const getLitLights = (input) => {
  const instructions = input.split("\n");

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const lightGrid = instructions.reduce((lightGrid, instruction: string) => {
    const { xs, ys, xe, ye } = parseInstruction(instruction);

    for (let y = ys; y <= ye; y += 1) {
      if (!Array.isArray(lightGrid[y])) lightGrid[y] = [];
      for (let x = xs; x <= xe; x += 1) {
        if (instruction.startsWith("turn on")) {
          lightGrid[y][x] = true;
        }

        if (instruction.startsWith("turn off")) {
          lightGrid[y][x] = false;
        }

        if (instruction.startsWith("toggle")) {
          lightGrid[y][x] = lightGrid[y][x] !== true;
        }
      }
    }

    return lightGrid;
  }, []);

  let lit = 0;

  lightGrid.forEach((lightRow) => {
    lightRow.forEach((light) => {
      if (light === true) {
        lit += 1;
      }
    });
  });

  return lit;
};

export const getTotalBrightness = (input) => {
  const instructions = input.split("\n");

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const lightGrid = instructions.reduce((lightGrid, instruction: string) => {
    const { xs, ys, xe, ye } = parseInstruction(instruction);

    for (let y = ys; y <= ye; y += 1) {
      if (!Array.isArray(lightGrid[y])) lightGrid[y] = [];
      for (let x = xs; x <= xe; x += 1) {
        if (typeof lightGrid[y][x] !== "number") {
          lightGrid[y][x] = 0;
        }

        if (instruction.startsWith("turn on")) {
          lightGrid[y][x] += 1;
        }

        if (instruction.startsWith("turn off")) {
          lightGrid[y][x] = Math.max(lightGrid[y][x] - 1, 0);
        }

        if (instruction.startsWith("toggle")) {
          lightGrid[y][x] += 2;
        }
      }
    }

    return lightGrid;
  }, []);

  let totalBrightness = 0;

  lightGrid.forEach((lightRow) => {
    lightRow.forEach((light) => {
      if (typeof light === "number") {
        totalBrightness += light;
      }
    });
  });

  return totalBrightness;
};
