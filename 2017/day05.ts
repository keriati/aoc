export const getResult = (input) => {
  const offsets = input.split("\n").map((n) => Number(n));

  let jumps = 0;
  let position = 0;

  while (position >= 0 && position < offsets.length) {
    const oldPosition = position;
    const jump = offsets[position];

    position = oldPosition + jump;

    offsets[oldPosition]++;
    jumps++;
  }

  return jumps;
};

export const getResult2 = (input) => {
  const offsets = input.split("\n").map((n) => Number(n));

  let jumps = 0;
  let position = 0;

  while (position >= 0 && position < offsets.length) {
    const oldPosition = position;
    const jump = offsets[position];

    position = oldPosition + jump;

    offsets[oldPosition] += jump >= 3 ? -1 : 1;
    jumps++;
  }

  return jumps;
};
