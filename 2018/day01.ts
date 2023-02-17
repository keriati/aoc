export const getFrequency = (input) =>
  input.split("\n").reduce((sum, change) => {
    const [, dir, numS] = change.match(/([+-])(\d+)/);
    const num = parseInt(numS, 10);
    return dir === "+" ? sum + num : sum - num;
  }, 0);

export const getFrequencyTwice = (input) => {
  const frequencies = new Set();
  let frequency = 0;

  while (true) {
    for (const change of input.split("\n")) {
      const [, dir, numS] = change.match(/([+-])(\d+)/);
      const num = parseInt(numS, 10);

      frequency = dir === "+" ? frequency + num : frequency - num;

      if (frequencies.has(frequency)) return frequency;

      frequencies.add(frequency);
    }
  }
};
