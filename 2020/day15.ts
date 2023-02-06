export const getNumberSpoken = (input, limit) => {
  const nums = input.split(",").map((n) => parseInt(n, 10));
  const lastIndex = new Map<number, number>();

  for (let i = 0; i < nums.length - 1; i++) {
    lastIndex.set(nums[i], i);
  }

  let prev = nums[nums.length - 1];

  for (let i = nums.length; i < limit; i++) {
    const prevCache = prev;
    prev = lastIndex.has(prev) ? i - (lastIndex.get(prev) + 1) : 0;
    lastIndex.set(prevCache, i - 1);
  }

  return prev;
};
