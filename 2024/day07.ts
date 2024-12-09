// the need for speed
let target: number;
let nums: number[];

const isValidEquation = (result: number, i = 0) => {
  if (nums.length === i) return target === result;
  if (result > target) return false;

  return (
    // try *
    isValidEquation(result * nums[i], i + 1) ||
    // try +
    isValidEquation(result + nums[i], i + 1)
  );
};

export const getValidEquations = (input: string) =>
  input
    .split("\n")
    .map((line) => line.split(/:\s|\s/).map(Number))
    .filter((l) => {
      [target] = l;
      nums = l.slice(2);
      return isValidEquation(l[1]);
    })
    .reduce((result, [a]) => result + a, 0);

const isValidEquationWithConcat = (result: number, i = 0) => {
  if (nums.length === i) return target === result;
  if (result > target) return false;

  return (
    // try *
    isValidEquationWithConcat(result * nums[i], i + 1) ||
    // try +
    isValidEquationWithConcat(result + nums[i], i + 1) ||
    // try |
    isValidEquationWithConcat(
      Number(`${result}${nums[i]}`),
      // result * 10 ** Math.floor(Math.log10(nums[i]) + 1) + nums[i],
      i + 1
    )
  );
};

export const getValidEquationsWithConcat = (input: string) =>
  input
    .split("\n")
    .map((line) => line.split(/:\s|\s/).map(Number))
    .filter((l) => {
      [target] = l;
      nums = l.slice(2);
      return isValidEquationWithConcat(l[1]);
    })
    .reduce((result, [a]) => result + a, 0);
