const MAGIC_NUMBER = 42;

const getVisitingElves = (houseNumber: number): number[] => {
  const houseNumberSqrt = Math.sqrt(houseNumber);
  const elvesSqrt = [];
  const elves = new Set<number>();

  for (let i = 1; i <= houseNumberSqrt; i++) {
    if (houseNumber % i === 0) {
      elvesSqrt.push(i);
      elves.add(i);
    }
  }

  for (let i = 0; i < elvesSqrt.length; i++) {
    elves.add(houseNumber / elvesSqrt[i]);
  }

  return Array.from(elves);
};

export const getPresentsCount = (houseNumber: number) =>
  getVisitingElves(houseNumber).reduce((acc, curr) => acc + curr * 10, 0);

export const getHouseNumberWithPresents = (input: number) => {
  let houseNumber = Math.floor(input / (MAGIC_NUMBER + 2));

  while (true) {
    const presentsCount = getPresentsCount(houseNumber);
    if (presentsCount >= input) return houseNumber;
    houseNumber++;
  }
};

export const getPresentsCountLazy = (houseNumber: number) =>
  getVisitingElves(houseNumber)
    .filter((elf) => elf * 50 >= houseNumber)
    .reduce((acc, curr) => acc + curr * 11, 0);

export const getHouseNumberWithPresentsLazy = (input: number) => {
  let houseNumber = Math.floor(input / (MAGIC_NUMBER - 1));

  while (true) {
    const presentsCount = getPresentsCountLazy(houseNumber);
    if (presentsCount >= input) return houseNumber;
    houseNumber++;
  }
};
