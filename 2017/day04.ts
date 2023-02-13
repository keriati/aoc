export const getValidPasswords = (input) =>
  input.split("\n").filter((l) => {
    const words = l.split(" ");
    const wordCounter = new Set();

    for (const word of words) {
      if (wordCounter.has(word)) return false;
      wordCounter.add(word);
    }

    return true;
  }).length;

export const getValidPasswordNoAna = (input) =>
  input.split("\n").filter((l) => {
    const words = l.split(" ").map((w) => w.split("").sort().join(""));

    const uniqueWords = new Set(words);

    return words.length === uniqueWords.size;
  }).length;
