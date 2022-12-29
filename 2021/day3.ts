/* eslint-disable */
const getZeroBitCounts = (reports: string[]) =>
  reports.reduce((state, report) => {
    report.split("").forEach((bit, i) => {
      if (!state[i]) {
        state[i] = 0;
      }

      if (bit === "0") {
        state[i] += 1;
      }
    });

    return state;
  }, []);

export const getResult = (input) => {
  const lines = input.split("\n");

  const zeroBitCounts = getZeroBitCounts(lines);

  const rates = zeroBitCounts.reduce(
    ({ gamma, epsilon }, zeroBitCount) => {
      if (zeroBitCount <= Math.floor(lines.length / 2)) {
        gamma = `${gamma}1`;
        epsilon = `${epsilon}0`;
      } else {
        gamma = `${gamma}0`;
        epsilon = `${epsilon}1`;
      }

      return {
        gamma,
        epsilon,
      };
    },
    { gamma: "", epsilon: "" }
  );

  return Number.parseInt(rates.gamma, 2) * Number.parseInt(rates.epsilon, 2);
};

const getMostCommonBit = (lines: string[], index: number) => {
  const { zero, one } = lines.reduce(
    ({ zero, one }, line) => {
      if (line[index] === "0") {
        zero += 1;
      } else {
        one += 1;
      }

      return {
        zero,
        one,
      };
    },
    {
      zero: 0,
      one: 0,
    }
  );

  return one >= zero ? 1 : 0;
};

const getRating = (lines: string[], bit: string, round: number = 0) => {
  if (lines.length === 1) {
    return lines[0];
  }

  const mostCommonBit = getMostCommonBit(lines, round);

  const filteredLines = lines.filter((line) =>
    bit === "1"
      ? line[round] === `${mostCommonBit}`
      : line[round] !== `${mostCommonBit}`
  );

  return getRating(filteredLines, bit, round + 1);
};

const getOxygenRating = (lines: string[]) => {
  const rating = getRating(lines, "1");

  return Number.parseInt(rating, 2);
};

const getScrubberRating = (lines: string[]) => {
  const rating = getRating(lines, "0");

  return Number.parseInt(rating, 2);
};

export const getResultPart2 = (input) => {
  let lines = input.split("\n");

  const oxygenRating = getOxygenRating(lines);
  const scrubberRating = getScrubberRating(lines);

  return oxygenRating * scrubberRating;
};
