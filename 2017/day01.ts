export const getMatchingDigitSum = (input) =>
  input.split("").reduce((sum, digit, i, digits) => {
    if (digit === digits[i + 1]) {
      sum += parseInt(digit, 10);
    }

    return sum;
  }, parseInt(input[0], 10));

export const getHalfwayMatchingDigitSum = (input) =>
  input.split("").reduce((sum, digit, i, digits) => {
    const nextIndex =
      i + digits.length / 2 <= digits.length
        ? i + digits.length / 2
        : i - digits.length / 2;

    if (digit === digits[nextIndex]) {
      sum += parseInt(digit, 10);
    }

    return sum;
  }, 0);
