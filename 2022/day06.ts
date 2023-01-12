export const getSignalStart = (inputs) => {
  const input = inputs.split("\n");

  return input.map((inputLine) => {
    for (let i = 0; i < inputLine.length - 5; i += 1) {
      if (
        inputLine[i] !== inputLine[i + 1] &&
        inputLine[i] !== inputLine[i + 2] &&
        inputLine[i] !== inputLine[i + 3] &&
        inputLine[i + 1] !== inputLine[i + 2] &&
        inputLine[i + 1] !== inputLine[i + 3] &&
        inputLine[i + 2] !== inputLine[i + 3]
      ) {
        return i + 4;
      }
    }
    return 0;
  });
};

export const getMessageStart = (inputs) => {
  const input = inputs.split("\n");

  return input.map((inputLine: string) => {
    const window = inputLine.split("").slice(0, 14);
    for (let i = 0; i < inputLine.length - 15; i += 1) {
      const windowSet = new Set(window);
      if (window.length === windowSet.size) {
        return i + 14;
      }
      window.shift();
      window.push(inputLine[i + 14]);
    }
    return 0;
  });
};
