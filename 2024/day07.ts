const isValidEquation = (
  target: number,
  nums: number[],
  result: number,
  i = 0
) => {
  if (nums.length === i) return target === result;
  if (result > target) return false;

  return (
    // try *
    isValidEquation(target, nums, result * nums[i], i + 1) ||
    // try +
    isValidEquation(target, nums, result + nums[i], i + 1)
  );
};

export const getValidEquations = (input: string) =>
  input
    .split("\n")
    .map((line) => line.split(/:\s|\s/).map(Number))
    .filter((line) => isValidEquation(line[0], line.slice(2), line[1]))
    .reduce((result, [a]) => result + a, 0);

const isValidEquationWithConcat = (
  target: number,
  nums: number[],
  result: number,
  i = 0
) => {
  if (nums.length === i) return target === result;
  if (result > target) return false;

  return (
    // try *
    isValidEquationWithConcat(target, nums, result * nums[i], i + 1) ||
    // try +
    isValidEquationWithConcat(target, nums, result + nums[i], i + 1) ||
    // try |
    isValidEquationWithConcat(
      target,
      nums,
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
    .filter((l) => isValidEquationWithConcat(l[0], l.slice(2), l[1]))
    .reduce((result, [a]) => result + a, 0);
