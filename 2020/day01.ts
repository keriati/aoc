export const getResult = (input) => {
  const lines = input.split("\n");
  const nums: number[] = lines.map((n) => parseInt(n, 10));
  const smallNums: number[] = nums.filter(n => n < 1000);

  for (const num of nums) {
    for (const smallNum of smallNums) {
      if (num + smallNum === 2020) {
        return num * smallNum;
      }
    }
  }

  return 0;
};

export const getResult2 = (input) => {
  const lines = input.split("\n");
  const nums: number[] = lines.map((n) => parseInt(n, 10));
  const smallNums: number[] = nums.filter(n => n < 1400);

  for (let i = 0; i < smallNums.length; i++) {
    for (let j = i+1; j < smallNums.length; j++) {
      for (let k = j+1; k < smallNums.length; k++) {
        if (smallNums[i] + smallNums[k] + smallNums[j] === 2020) {
          return smallNums[i] * smallNums[j] * smallNums[k];
        }
      }
    }
  }

  return 0;
};