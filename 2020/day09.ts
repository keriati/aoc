export const findNumber = (input: string, preambleSize: number) => {
  const numbers = input.split("\n").map((n) => parseInt(n, 10));
  const preamble = new Set<number>(numbers.slice(0, preambleSize));

  return numbers.find((target, i) => {
    if (i < preambleSize) return false;

    for (let j = i - preambleSize; j < i; j++) {
      const missing = target - numbers[j];

      if (preamble.has(missing)) {
        preamble.delete(numbers[i - preambleSize]);
        preamble.add(numbers[i]);
        return false;
      }
    }

    return true;
  });
};

const getSumMinMax = (numbers: number[]) => {
  numbers.sort((a, b) => a - b);
  return numbers[0] + numbers[numbers.length - 1];
};

export const getEncryptionWeakness = (input: string, target: number) => {
  const allNumbers = input.split("\n").map((n) => parseInt(n, 10));
  const numbers = allNumbers.slice(0, allNumbers.indexOf(target));

  for (let windowSize = 2; windowSize < numbers.length; windowSize++) {
    let sum = 0;
    for (let i = 0; i < windowSize; i++) {
      sum += numbers[i];
    }

    for (let startIndex = 0; startIndex < numbers.length; startIndex++) {
      const endIndex = startIndex + windowSize - 1;

      if (sum === target) {
        const range = numbers.slice(startIndex, endIndex);
        return getSumMinMax(range);
      }

      sum += numbers[endIndex + 1];
      sum -= numbers[startIndex];
    }
  }

  return null;
};
