import { createCombinations } from "../util/utils";

export const sum = (arr) => arr.reduce((s, n) => s + n, 0);

export const getBottleComb = (input, size) => {
  const nums = input.split("\n").map((n) => Number(n));
  let combs = 0;

  for (let i = 2; i < 10; i++) {
    const combinations = createCombinations<number>(nums, i);
    const exactFitCombinations = combinations.filter(
      (items) => sum(items) === size
    );
    combs += exactFitCombinations.length;
  }

  return combs;
};

export const getMinAmountComb = (input, size) => {
  const nums = input.split("\n").map((n) => Number(n));

  for (let i = 2; i < 10; i++) {
    const combinations = createCombinations<number>(nums, i);
    const exactFitCombinations = combinations.filter(
      (items) => sum(items) === size
    );
    if (exactFitCombinations.length > 0) {
      return exactFitCombinations.length;
    }
  }

  return 0;
};
