export const isNice = (word: string): boolean => {
  const naughty = ["ab", "cd", "pq", "xy"];
  const allVowels = ["a", "e", "i", "o", "u"];
  const wordVowels = [];
  let hasTwice = false;
  let hasNaughty = false;

  word.split("").find((letter, i) => {
    if (i < word.length) {
      const str = `${letter}${word[i + 1]}`;
      if (naughty.includes(str)) {
        hasNaughty = true;
        return true;
      }

      if (letter === word[i + 1]) {
        hasTwice = true;
      }
    }

    if (allVowels.includes(letter)) {
      wordVowels.push(letter);
    }
    return false;
  });

  return !hasNaughty && hasTwice && wordVowels.length >= 3;
};

export const countNice = (input) => {
  const words = input.split("\n");

  return words.reduce((state, word) => {
    if (isNice(word)) return state + 1;
    return state;
  }, 0);
};

export const isNicer = (word: string): boolean => {
  const pairs = {};
  let hasPair = false;
  let hasRepeat = false;

  word.split("").forEach((letter, i) => {
    if (i < word.length) {
      const myPair = `${letter}${word[i + 1]}`;

      if (typeof pairs[myPair] === "number") {
        if (pairs[myPair] !== i - 1) {
          hasPair = true;
        }
      } else {
        pairs[myPair] = i;
      }
    }

    if (i + 1 < word.length) {
      if (letter === word[i + 2]) {
        hasRepeat = true;
      }
    }
  });

  return hasPair && hasRepeat;
};

export const countNicer = (input) => {
  const words = input.split("\n");

  return words.reduce((state, word) => {
    if (isNicer(word)) return state + 1;
    return state;
  }, 0);
};
