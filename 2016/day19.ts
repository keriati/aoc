// see https://www.youtube.com/watch?v=uCsD3ZGzMgE
export const getWinningElf = (input) => {
  const elves = Number(input);
  return parseInt(`${elves.toString(2).substring(1)}1`, 2);
};

export const getWinningElfPart2 = (input) => {
  const elves = Number(input);
  let elfIndex = 1;

  while (elfIndex * 3 < elves) {
    elfIndex *= 3;
  }

  return elves - elfIndex;
};
