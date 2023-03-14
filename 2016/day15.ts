const parseDisks = (input) =>
  input.split("\n").map((l): [number, number] => {
    const [, positionsString, currentPositionString] = l.match(
      /Disc #\d+ has (\d+) positions; at time=0, it is at position (\d+)/
    );
    return [Number(positionsString), Number(currentPositionString)];
  });

export const getButtonTime = (input) => {
  const disks = parseDisks(input);

  let time = 0;
  let passes = false;

  while (passes !== true) {
    passes = true;

    for (let i = 0; i < disks.length; i++) {
      const diskCycle = disks[i][1] + 1 + i + time;
      const diskPosition = diskCycle % disks[i][0];

      if (diskPosition !== 0) {
        passes = false;
        break;
      }
    }

    if (!passes) time++;
  }

  return time;
};
export const getButtonTime2 = (input) => {
  const disks = parseDisks(input);
  disks.push([11, 0]);

  let time = 0;
  let passes = false;

  while (passes !== true) {
    passes = true;

    for (let i = 0; i < disks.length; i++) {
      const diskCycle = disks[i][1] + 1 + i + time;
      const diskPosition = diskCycle % disks[i][0];

      if (diskPosition !== 0) {
        passes = false;
        break;
      }
    }

    if (!passes) time++;
  }

  return time;
};

/**
 *                  E
 * 0     4   1      E
 * 1     0   0      E
 * 2     1   1      E
 * 3     2   0      E
 * 4     3   1      E
 * 5     4   0
 * 6     0   1
 * 7     1   0
 */
