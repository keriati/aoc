const getCharCounter = (words) => {
  const charCounter = new Map<number, Map<string, number>>();

  words.forEach((word) => {
    word.split("").forEach((char, pos) => {
      if (!charCounter.has(pos)) charCounter.set(pos, new Map());

      const positionMap = charCounter.get(pos);

      if (!positionMap.has(char)) positionMap.set(char, 0);
      positionMap.set(char, positionMap.get(char) + 1);
    });
  });

  return charCounter;
};

export const getMessageMostCommon = (input) => {
  const words = input.split("\n");
  const charCounter = getCharCounter(words);

  const result = [];

  charCounter.forEach((positionMap, position) => {
    let mostCommonChar = null;
    let maxOccurrence = 0;

    positionMap.forEach((occurrence, char) => {
      if (occurrence > maxOccurrence) {
        maxOccurrence = occurrence;
        mostCommonChar = char;
      }
    });

    result[position] = mostCommonChar;
  });

  return result.join("");
};

export const getMessageLeastCommon = (input) => {
  const words = input.split("\n");
  const charCounter = getCharCounter(words);

  const result = [];

  charCounter.forEach((positionMap, position) => {
    let leastCommonChar = null;
    let minOccurrence = Number.MAX_SAFE_INTEGER;

    positionMap.forEach((occurrence, char) => {
      if (occurrence < minOccurrence) {
        minOccurrence = occurrence;
        leastCommonChar = char;
      }
    });

    result[position] = leastCommonChar;
  });

  return result.join("");
};
