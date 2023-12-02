export const getPossibleGamesCount = (input) =>
  input
    .split("\n")
    .filter(
      (line: string) =>
        (
          line.match(
            /(1[3-9]|[2-9][0-9]) red|(1[4-9]|[2-9][0-9]) green|(1[5-9]|[2-9][0-9]) blue/g
          ) || []
        ).length === 0
    )
    .reduce((s, l) => s + Number(l.match(/Game (\d+)/)[1]), 0);

export const getMinimumSetPower = (input) =>
  input.split("\n").reduce((sum, line) => {
    const requiredCubes = {
      red: 0,
      green: 0,
      blue: 0,
    };

    const cubes = line.split(":")[1].split(/[,|;]/);

    for (const cube of cubes) {
      const [number, color] = cube.trim().split(" ");

      if (requiredCubes[color] < Number(number)) {
        requiredCubes[color] = Number(number);
      }
    }

    return (
      sum +
      (requiredCubes.red || 1) *
        (requiredCubes.green || 1) *
        (requiredCubes.blue || 1)
    );
  }, 0);
