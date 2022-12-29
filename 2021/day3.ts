export const getResult = (input) => {
  const lines = input.split("\n");

  const zeroBitCounts = lines.reduce((state, report) => {
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
